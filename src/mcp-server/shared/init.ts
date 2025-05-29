import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { noop } from '../../utils/noop';
import { currentVersion } from '../../utils/version';
import { McpServerOptions } from './types';
import * as larkmcp from '../../mcp-tool';
import { oapiHttpInstance } from '../../utils/http-instance';

export function initMcpServer(options: McpServerOptions) {
  const { appId, appSecret, userAccessToken, refreshToken } = options;

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
    autoRefreshToken: !options.disableAutoRefresh, // 默认启用自动刷新
    refreshTokenOptions: {
      refreshThresholdMinutes: options.refreshThreshold ? parseInt(options.refreshThreshold) : 1,
    },
    userAccessToken,
    refreshToken,
  });

  if (userAccessToken) {
    if (refreshToken) {
      // 如果同时提供了访问令牌和刷新令牌，初始化自动刷新
      larkClient.initializeTokenRefresh(userAccessToken, refreshToken, 300);
      console.log('Auto-refresh enabled with 300s token expiry');
    } else {
      // 只提供访问令牌，传统方式更新
      larkClient.updateUserAccessToken(userAccessToken);
    }
  }

  larkClient.registerMcpServer(mcpServer, { toolNameCase: options.toolNameCase });

  return { mcpServer, larkClient };
}
