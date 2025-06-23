import * as larkmcp from '../../mcp-tool';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { initStdioServer, initSSEServer, initStreamableServer } from '../transport';
import { McpServerOptions, McpServerType } from './types';
import { noop } from '../../utils/noop';
import { currentVersion } from '../../utils/version';
import { oapiHttpInstance } from '../../utils/http-instance';
import { LarkAuthHandler } from '../../auth';
import { logger } from '../../utils/logger';

export function initOAPIMcpServer(options: McpServerOptions, authHandler?: LarkAuthHandler) {
  const { appId, appSecret, userAccessToken, tokenMode, domain, oauth } = options;

  if (!appId || !appSecret) {
    console.error('Error: Missing App Credentials');
    throw new Error('Missing App Credentials');
  }

  let allowTools = options.tools || [];

  for (const [presetName, presetTools] of Object.entries(larkmcp.presetTools)) {
    if (allowTools.includes(presetName)) {
      allowTools = [...presetTools, ...allowTools];
    }
  }

  // Unique
  allowTools = Array.from(new Set(allowTools));

  // Create MCP Server
  const mcpServer = new McpServer({ id: 'lark-mcp-server', name: 'Feishu/Lark MCP Server', version: currentVersion });

  const toolsOptions = allowTools.length
    ? { allowTools: allowTools as larkmcp.ToolName[], language: options.language }
    : { language: options.language };

  const larkClient = new larkmcp.LarkMcpTool(
    {
      appId,
      appSecret,
      logger: { warn: noop, error: noop, debug: noop, info: noop, trace: noop },
      httpInstance: oapiHttpInstance,
      domain,
      toolsOptions,
      tokenMode,
      oauth,
    },
    authHandler,
  );

  if (userAccessToken) {
    larkClient.updateUserAccessToken(userAccessToken);
  }

  larkClient.registerMcpServer(mcpServer, { toolNameCase: options.toolNameCase });

  return { mcpServer, larkClient };
}

export function initRecallMcpServer(options: McpServerOptions) {
  const server = new McpServer({
    id: 'lark-recall-mcp-server',
    name: 'Lark Recall MCP Service',
    version: currentVersion,
  });
  server.tool(larkmcp.RecallTool.name, larkmcp.RecallTool.description, larkmcp.RecallTool.schema, (params) =>
    larkmcp.RecallTool.handler(params, options),
  );
  return server;
}

export async function initMcpServerWithTransport(serverType: McpServerType, options: McpServerOptions) {
  const { mode, userAccessToken, oauth } = options;

  if (userAccessToken && oauth) {
    logger.error(`[initMcpServerWithTransport] userAccessToken and oauth cannot be used together`);
    throw new Error('userAccessToken and oauth cannot be used together');
  }

  const getNewServer = (commonOptions?: McpServerOptions, authHandler?: LarkAuthHandler) => {
    if (serverType === 'oapi') {
      const { mcpServer } = initOAPIMcpServer({ ...options, ...commonOptions }, authHandler);
      return mcpServer;
    } else if (serverType === 'recall') {
      return initRecallMcpServer({ ...options, ...commonOptions });
    }
    logger.error(`[initMcpServerWithTransport] Invalid server type: ${serverType}`);
    throw new Error('Invalid server type');
  };

  switch (mode) {
    case 'stdio':
      await initStdioServer(getNewServer, options);
      break;
    case 'sse':
      await initSSEServer(getNewServer, options);
      break;
    case 'streamable':
      await initStreamableServer(getNewServer, options);
      break;
    default:
      throw new Error('Invalid mode:' + mode);
  }
}
