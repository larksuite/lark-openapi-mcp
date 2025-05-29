import { Client } from '@larksuiteoapi/node-sdk';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LarkMcpToolOptions, McpTool, ToolNameCase, TokenMode } from './types';
import { AllTools, AllToolsZh } from './tools';
import { filterTools } from './utils/filter-tools';
import { defaultToolNames } from './constants';
import { larkOapiHandler } from './utils/handler';
import { caseTransf } from './utils/case-transf';
import { getShouldUseUAT } from './utils/get-should-use-uat';
import { TokenRefreshManager } from './utils/token-refresh';

/**
 * Feishu/Lark MCP
 */
export class LarkMcpTool {
  // Lark Client
  private client: Client | null = null;

  // User Access Token
  private userAccessToken: string | undefined;

  // Token Mode
  private tokenMode: TokenMode = TokenMode.AUTO;

  // All Tools
  private allTools: McpTool[] = [];

  // Token Refresh Manager
  private tokenRefreshManager: TokenRefreshManager | null = null;

  // Auto Refresh Enabled
  private autoRefreshEnabled: boolean;

  /**
   * Feishu/Lark MCP
   * @param options Feishu/Lark Client Options
   */
  constructor(options: LarkMcpToolOptions) {
    if (options.client) {
      this.client = options.client;
    } else if (options.appId && options.appSecret) {
      this.client = new Client({
        appId: options.appId,
        appSecret: options.appSecret,
        ...options,
      });
    }
    this.tokenMode = options.tokenMode || TokenMode.AUTO;
    this.autoRefreshEnabled = options.autoRefreshToken !== false; // 默认开启自动刷新
    
    const isZH = options.toolsOptions?.language === 'zh';

    const filterOptions = {
      allowTools: defaultToolNames,
      tokenMode: this.tokenMode,
      ...options.toolsOptions,
    };
    this.allTools = filterTools(isZH ? AllToolsZh : AllTools, filterOptions);

    // 初始化令牌刷新管理器
    if (this.client && this.autoRefreshEnabled) {
      this.tokenRefreshManager = new TokenRefreshManager(this.client, {
        onTokenRefreshed: (tokenInfo) => {
          this.userAccessToken = tokenInfo.accessToken;
        },
        onRefreshError: (error) => {
          console.error('Token refresh failed:', error.message);
        },
        ...options.refreshTokenOptions,
      });

      // 如果提供了初始令牌信息，立即初始化
      if (options.userAccessToken && options.refreshToken) {
        this.userAccessToken = options.userAccessToken;
        this.tokenRefreshManager.initialize(
          options.userAccessToken,
          options.refreshToken
        );
      }
    }
  }

  /**
   * Update User Access Token
   * @param userAccessToken User Access Token
   * @param refreshToken Refresh Token (optional, for auto-refresh)
   * @param expiresIn Token expiration time in seconds (optional)
   */
  updateUserAccessToken(userAccessToken: string, refreshToken?: string, expiresIn?: number) {
    this.userAccessToken = userAccessToken;
    
    // 如果启用了自动刷新且提供了刷新令牌，更新刷新管理器
    if (this.tokenRefreshManager && refreshToken) {
      this.tokenRefreshManager.initialize(userAccessToken, refreshToken, expiresIn);
    }
  }

  /**
   * Initialize token refresh with complete token information
   * @param userAccessToken User Access Token
   * @param refreshToken Refresh Token
   * @param expiresIn Token expiration time in seconds (defaults to 300s)
   */
  initializeTokenRefresh(userAccessToken: string, refreshToken: string, expiresIn: number = 300) {
    if (!this.client) {
      throw new Error('Client not initialized');
    }

    this.userAccessToken = userAccessToken;
    
    if (!this.tokenRefreshManager && this.autoRefreshEnabled) {
      this.tokenRefreshManager = new TokenRefreshManager(this.client, {
        onTokenRefreshed: (tokenInfo) => {
          this.userAccessToken = tokenInfo.accessToken;
        },
        onRefreshError: (error) => {
          console.error('Token refresh failed:', error.message);
        },
      });
    }

    if (this.tokenRefreshManager) {
      this.tokenRefreshManager.initialize(userAccessToken, refreshToken, expiresIn);
    }
  }

  /**
   * Get current token information
   */
  getCurrentTokenInfo() {
    return this.tokenRefreshManager?.getCurrentToken();
  }

  /**
   * Stop auto-refresh
   */
  stopAutoRefresh() {
    if (this.tokenRefreshManager) {
      this.tokenRefreshManager.stop();
    }
  }

  /**
   * Get MCP Tools
   * @returns MCP Tool Definition Array
   */
  getTools(): McpTool[] {
    return this.allTools;
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
              content: [{ type: 'text' as const, text: 'Client not initialized' }],
            };
          }
          
          // 如果启用自动刷新，确保令牌是最新的
          if (this.tokenRefreshManager && this.tokenMode === TokenMode.USER_ACCESS_TOKEN) {
            try {
              this.userAccessToken = await this.tokenRefreshManager.getAccessToken();
            } catch (error) {
              return {
                isError: true,
                content: [{ type: 'text' as const, text: `Token refresh failed: ${(error as Error)?.message}` }],
              };
            }
          }
          
          const handler = tool.customHandler || larkOapiHandler;
          if (this.tokenMode == TokenMode.USER_ACCESS_TOKEN && !this.userAccessToken) {
            return {
              isError: true,
              content: [{ type: 'text' as const, text: 'Invalid UserAccessToken' }],
            };
          }
          const shouldUseUAT = getShouldUseUAT(this.tokenMode, this.userAccessToken, params?.useUAT);
          return handler(
            this.client,
            { ...params, useUAT: shouldUseUAT },
            { userAccessToken: this.userAccessToken, tool },
          );
        } catch (error) {
          return {
            isError: true,
            content: [{ type: 'text' as const, text: `Error: ${JSON.stringify((error as Error)?.message)}` }],
          };
        }
      });
    }
  }
}
