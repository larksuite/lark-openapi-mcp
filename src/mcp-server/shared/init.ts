import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { noop } from '../../utils/noop';
import { currentVersion } from '../../utils/version';
import { McpServerOptions } from './types';
import * as larkmcp from '../../mcp-tool';
import { oapiHttpInstance } from '../../utils/http-instance';
import { TokenStorage } from '../../utils/token-storage';
import { FeishuOAuth } from '../../utils/oauth';

export async function initMcpServer(options: McpServerOptions) {
  const { appId, appSecret, userAccessToken } = options;

  if (!appId || !appSecret) {
    console.error(
      'Error: Missing App Credentials, please provide APP_ID and APP_SECRET or specify them via command line arguments',
    );
    process.exit(1);
  }

  let allowTools = Array.isArray(options.tools) ? options.tools : options.tools?.split(',') || [];

  for (const [presetName, presetTools] of Object.entries(larkmcp.presetTools)) {
    if (allowTools.includes(presetName)) {
      allowTools = [...presetTools, ...allowTools];
    }
  }

  // Unique
  allowTools = Array.from(new Set(allowTools));

  // Create MCP Server
  const mcpServer = new McpServer({ id: 'lark-mcp-server', name: 'Feishu/Lark MCP Server', version: currentVersion });

  const larkClient = new larkmcp.LarkMcpTool({
    appId,
    appSecret,
    logger: { warn: noop, error: noop, debug: noop, info: noop, trace: noop },
    httpInstance: oapiHttpInstance,
    domain: options.domain,
    toolsOptions: allowTools.length
      ? { allowTools: allowTools as larkmcp.ToolName[], language: options.language }
      : { language: options.language },
    tokenMode: options.tokenMode,
  });

  // Try to get user access token from OAuth storage if not provided
  let finalUserAccessToken = userAccessToken;
  
  if (!finalUserAccessToken) {
    try {
      const tokenStorage = new TokenStorage();
      const oauth = new FeishuOAuth({
        clientId: appId,
        clientSecret: appSecret,
        redirectUri: 'http://localhost:8080/callback',
        domain: options.domain || 'https://passport.feishu.cn',
      });

      const token = await tokenStorage.getValidAccessToken(
        (refreshToken) => oauth.refreshAccessToken(refreshToken)
      );
      finalUserAccessToken = token || undefined;

      if (finalUserAccessToken) {
        console.log('✅ Using OAuth access token from storage');
      }
    } catch (error) {
      console.warn('Failed to load OAuth tokens:', (error as Error).message);
    }
  }

  if (finalUserAccessToken) {
    larkClient.updateUserAccessToken(finalUserAccessToken);
  }

  larkClient.registerMcpServer(mcpServer, { toolNameCase: options.toolNameCase });

  return { mcpServer, larkClient };
}
