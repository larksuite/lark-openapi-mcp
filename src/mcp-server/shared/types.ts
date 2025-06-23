import * as larkmcp from '../../mcp-tool';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LarkAuthHandler } from '../../auth';

export type McpServerType = 'oapi' | 'recall';
export type McpServerTransport = 'stdio' | 'sse' | 'streamable';

export const mcpServerOptionSchema = z.object({
  tools: z.union([z.string(), z.array(z.string())]).optional(),
  language: z.enum(['zh', 'en']).optional(),
  toolNameCase: z.enum(['snake', 'camel']).optional(),
  tokenMode: z.enum(['auto', 'user_access_token', 'tenant_access_token']).optional(),
});

export interface McpServerOptions {
  appId?: string;
  appSecret?: string;
  domain?: string;
  tools?: string[];
  language?: 'zh' | 'en';
  toolNameCase?: larkmcp.ToolNameCase;
  tokenMode?: larkmcp.TokenMode;
  userAccessToken?: string | larkmcp.SettableValue;
  oauth?: boolean;
  scope?: string[];

  mode?: McpServerTransport;
  host?: string;
  port?: number;
}

export type InitTransportServerFunction = (
  getNewServer: (options?: McpServerOptions, authHandler?: LarkAuthHandler) => McpServer,
  options: McpServerOptions,
) => void | Promise<void>;
