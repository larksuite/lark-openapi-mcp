import { Client } from '@larksuiteoapi/node-sdk';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LarkMcpToolOptions, McpTool, SettableValue, ToolNameCase, TokenMode } from './types';
import { AllTools, AllToolsZh } from './tools';
import { defaultToolNames } from './constants';
import { filterTools, larkOapiHandler, caseTransf, getShouldUseUAT } from './utils';
import { LarkAuthHandler, isTokenValid } from '../auth';
import { safeJsonParse } from '../utils/safe-json-parse';
import { OAPI_MCP_ERROR_CODE } from '../utils/constants';
import { logger } from '../utils/logger';

/**
 * Feishu/Lark MCP
 */
export class LarkMcpTool {
  // Lark Client
  private client: Client | null = null;

  // User Access Token
  private userAccessToken: SettableValue = {};

  // Lark User Auth Handler
  private auth: LarkAuthHandler | undefined;

  // Lark MCP Tool Options
  private options: LarkMcpToolOptions;

  // All Tools
  private allTools: McpTool[] = [];

  /**
   * Feishu/Lark MCP
   * @param options Feishu/Lark Client Options
   */
  constructor(options: LarkMcpToolOptions, auth?: LarkAuthHandler) {
    this.options = options;
    this.auth = auth;

    if (options.client) {
      this.client = options.client;
    } else if (options.appId && options.appSecret) {
      this.client = new Client({ appId: options.appId, appSecret: options.appSecret, ...options });
    }

    const isZH = options.toolsOptions?.language === 'zh';

    const filterOptions = {
      allowTools: defaultToolNames,
      tokenMode: this.options.tokenMode || TokenMode.AUTO,
      ...options.toolsOptions,
    };

    this.allTools = filterTools(isZH ? AllToolsZh : AllTools, filterOptions);

    logger.info(`[LarkMcpTool] Initialized with ${this.allTools.length} tools, tokenMode: ${this.options.tokenMode}`);
  }

  /**
   * Get MCP Tools
   * @returns MCP Tool Definition Array
   */
  getTools(): McpTool[] {
    return this.allTools;
  }

  /**
   * Update User Access Token
   * @param userAccessToken User Access Token
   */
  updateUserAccessToken(userAccessToken: string | SettableValue) {
    if (typeof userAccessToken === 'string') {
      this.userAccessToken.value = userAccessToken;
    } else {
      this.userAccessToken = userAccessToken;
    }
  }

  private async getUserAccessToken() {
    if (this.userAccessToken.getter) {
      return await this.userAccessToken.getter();
    }
    return this.userAccessToken.value;
  }

  private async setUserAccessToken(userAccessToken: string) {
    this.userAccessToken.value = userAccessToken;
    if (this.userAccessToken.setter) {
      await this.userAccessToken.setter(userAccessToken);
    }
  }

  async reAuthorize(): Promise<{ userAccessToken?: string; authorizeUrl?: string }> {
    const userAccessToken = await this.getUserAccessToken();
    // if not enable oauth mode, return empty object
    if (!this.auth || !this.options.oauth) {
      return {};
    }
    logger.info(`[LarkMcpTool] Re-authorizing user access token`);
    const { authorizeUrl, accessToken } = await this.auth.reAuthorize(userAccessToken);
    if (accessToken) {
      logger.info(`[LarkMcpTool] Successfully re-authorized user access token`);
      this.setUserAccessToken(accessToken);
      return { userAccessToken: accessToken };
    }
    return { authorizeUrl };
  }

  async ensureGetUserAccessToken(): Promise<{ userAccessToken?: string; authorizeUrl?: string }> {
    const userAccessToken = await this.getUserAccessToken();
    if (!this.auth) {
      return { userAccessToken };
    }

    const { valid, isExpired, token } = await isTokenValid(userAccessToken);
    if (valid) {
      return { userAccessToken };
    }

    logger.info(`[LarkMcpTool] UserAccessToken is invalid or expired, trying to get new token...`);

    try {
      if (isExpired && token?.extra?.refreshToken) {
        logger.info(`[LarkMcpTool] UserAccessToken is expired, trying to use refreshToken to refresh...`);
        const newToken = await this.auth.refreshToken(token.token);
        if (newToken?.access_token) {
          this.setUserAccessToken(newToken.access_token);
          return { userAccessToken: newToken.access_token };
        }
      }
    } catch (error) {
      logger.error(`[LarkMcpTool] Failed to refreshToken: ${error}`);
    }

    // reAuthorize
    return await this.reAuthorize();
  }

  getReAuthorizeMessage(authorizeUrl?: string, errorCode?: number, errorText?: string) {
    const reAuthorizeMessage = {
      apiError: errorText,
      errorMessage: errorText || 'UserAccessToken is invalid or expired',
      instruction: authorizeUrl
        ? [
            errorCode === OAPI_MCP_ERROR_CODE.USER_ACCESS_TOKEN_UNAUTHORIZED
              ? 'UserAccessToken is not authorized to some scopes, make sure the corresponding permissions are enabled in the developer console, then please re-authorize, ensuring the user grants the corresponding permissions.'
              : 'UserAccessToken is invalid or expired.',
            'Please open the following URL in your browser to complete the login:',
            `Note: Please ensure the redirect URL (${this.auth?.callbackUrl}) is configured in your app's security settings.`,
            `   If not configured yet, go to: ${this.options.domain}/app/${this.options.appId}/safe`,
            'Authorization URL:',
            authorizeUrl,
            'This authorization link expires in 60 seconds. Generating a new link will immediately invalidate this one.',
          ]
            .join('\n')
            .trim()
        : undefined,
    };

    return {
      isError: true,
      content: [{ type: 'text' as const, text: JSON.stringify(reAuthorizeMessage) }],
    };
  }

  /**
   * Register Tools to MCP Server
   * @param server MCP Server Instance
   */
  registerMcpServer(server: McpServer, options?: { toolNameCase?: ToolNameCase }): void {
    for (const tool of this.allTools) {
      server.tool(caseTransf(tool.name, options?.toolNameCase), tool.description, tool.schema, async (params: any) => {
        try {
          if (!this.client) {
            return {
              isError: true,
              content: [{ type: 'text' as const, text: JSON.stringify({ msg: 'Client not initialized' }) }],
            };
          }
          const handler = tool.customHandler || larkOapiHandler;

          const shouldUseUAT = getShouldUseUAT(this.options.tokenMode, params?.useUAT ?? false);

          if (shouldUseUAT) {
            const { userAccessToken, authorizeUrl } = await this.ensureGetUserAccessToken();
            if (!userAccessToken) {
              return this.getReAuthorizeMessage(authorizeUrl);
            }

            logger.info(`[LarkMcpTool] Calling tool: ${tool.name}`);
            const result = await handler(this.client, { ...params, useUAT: shouldUseUAT }, { userAccessToken, tool });

            const errorCode = safeJsonParse(result.content?.[0]?.text as string, { code: 0 }).code;
            if (
              result.isError &&
              [
                OAPI_MCP_ERROR_CODE.USER_ACCESS_TOKEN_UNAUTHORIZED,
                OAPI_MCP_ERROR_CODE.USER_ACCESS_TOKEN_INVALID,
              ].includes(errorCode)
            ) {
              logger.info(
                `[LarkMcpTool] User access token unauthorized the scope or invalid, reAuthorize, errorCode: ${errorCode}`,
              );
              // user access token unauthorized the scope or invalid, reAuthorize
              const { authorizeUrl } = await this.reAuthorize();
              return this.getReAuthorizeMessage(authorizeUrl, errorCode, result.content?.[0]?.text as string);
            }

            return result;
          }
          logger.info(`[LarkMcpTool] Calling tool: ${tool.name}`);
          return handler(this.client, { ...params, useUAT: shouldUseUAT }, { tool });
        } catch (error) {
          logger.error(`[LarkMcpTool] Failed to call tool: ${tool.name}, error: ${error}`);
          return {
            isError: true,
            content: [{ type: 'text' as const, text: JSON.stringify((error as Error)?.message) }],
          };
        }
      });
    }
  }
}
