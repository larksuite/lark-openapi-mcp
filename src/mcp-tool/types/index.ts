import * as lark from '@larksuiteoapi/node-sdk';
import { ProjectName, ToolName } from '../tools';
import { CallToolResult } from '@modelcontextprotocol/sdk/types';

export type ToolNameCase = 'snake' | 'camel' | 'kebab' | 'dot';

export enum TokenMode {
  AUTO = 'auto',
  USER_ACCESS_TOKEN = 'user_access_token',
  TENANT_ACCESS_TOKEN = 'tenant_access_token',
}

export interface McpHandlerOptions {
  userAccessToken?: string;
  tool?: McpTool;
}

export type McpHandler = (
  client: lark.Client,
  params: any,
  options: McpHandlerOptions,
) => Promise<CallToolResult> | CallToolResult;

/**
 * MCP Tool
 */
export interface McpTool {
  // Project
  project: string;
  // Tool Name
  name: string;
  // Tool Description
  description: string;
  // Tool Parameters
  schema: any;
  // Node SDK Call Name
  sdkName?: string;
  // API Path
  path?: string;
  // API HTTP Method
  httpMethod?: string;
  // Access Token Type
  accessTokens?: string[];
  // Whether to support file upload
  supportFileUpload?: boolean;
  // Whether to support file download
  supportFileDownload?: boolean;
  // Custom Handler
  customHandler?: McpHandler;
}

/**
 * Tools Filter Options
 */
export interface ToolsFilterOptions {
  // Language
  language?: 'zh' | 'en';
  // Allowed Tools
  allowTools?: ToolName[];
  // Allowed Projects
  allowProjects?: ProjectName[];
  // Access Token Type
  tokenMode?: TokenMode;
}

export type LarkClientOptions = Partial<ConstructorParameters<typeof lark.Client>[0]>;

export interface LarkMcpToolOptions extends LarkClientOptions {
  client?: lark.Client;
  appId?: string;
  appSecret?: string;
  toolsOptions?: ToolsFilterOptions;
  tokenMode?: TokenMode;
  oauth?: boolean;
}

export interface SettableValue {
  value?: string;
  getter?: () => Promise<string | undefined>;
  setter?: (value?: string) => Promise<void>;
}
