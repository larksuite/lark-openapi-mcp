import * as larkmcp from '../../mcp-tool';
import { caseTransf } from '../../mcp-tool/utils';
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

  let allowTools = (options.tools || []).filter((name) => name.length > 0);

  for (const [presetName, presetTools] of Object.entries(larkmcp.presetTools)) {
    if (allowTools.includes(presetName)) {
      allowTools = [...presetTools, ...allowTools];
    }
  }

  // Unique
  allowTools = Array.from(new Set(allowTools));

  // A name that matches nothing would otherwise register zero tools with no signal (#77)
  const knownToolNames = new Set<string>();
  const snakeToName = new Map<string, string>();
  const projectNames = new Set<string>();
  for (const tool of larkmcp.AllTools) {
    knownToolNames.add(tool.name);
    snakeToName.set(caseTransf(tool.name, 'snake'), tool.name);
    projectNames.add(tool.project);
  }
  for (const presetName of Object.keys(larkmcp.presetTools)) {
    snakeToName.set(caseTransf(presetName, 'snake'), presetName);
  }
  const unknownNames = allowTools.filter(
    (name) => !knownToolNames.has(name) && !Object.prototype.hasOwnProperty.call(larkmcp.presetTools, name),
  );
  for (const name of unknownNames) {
    const suggestion = snakeToName.get(name);
    if (suggestion) {
      console.error(`Warning: unknown tool or preset name "${name}" (did you mean "${suggestion}"?)`);
    } else if (projectNames.has(name)) {
      console.error(`Warning: "${name}" is a project name and not valid here; --tools accepts tool names or presets`);
    } else {
      console.error(`Warning: unknown tool or preset name "${name}"`);
    }
  }
  if (unknownNames.length) {
    console.error(`Available presets: ${Object.keys(larkmcp.presetTools).join(', ')}`);
  }

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

  if (allowTools.length && larkClient.getTools().length === 0) {
    console.error(
      'Warning: no tools matched the provided --tools/--token-mode options; the MCP server starts with zero tools',
    );
  }

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

  const needAuthFlow = serverType === 'oapi';

  switch (mode) {
    case 'stdio':
      await initStdioServer(getNewServer, options, { needAuthFlow });
      break;
    case 'sse':
      await initSSEServer(getNewServer, options, { needAuthFlow });
      break;
    case 'streamable':
      await initStreamableServer(getNewServer, options, { needAuthFlow });
      break;
    default:
      throw new Error('Invalid mode:' + mode);
  }
}
