import * as lark from '@larksuiteoapi/node-sdk';
import { ProjectName, ToolName } from '../tools';
import { CallToolResult } from '@modelcontextprotocol/sdk/types';

export type ToolNameCase = 'snake' | 'camel' | 'kebab' | 'dot';

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
 * MCP工具类型定义
 */
export interface McpTool {
  // 业务
  project: string;
  // 工具名称
  name: string;
  // 工具描述
  description: string;
  // 工具参数
  schema: any;
  // node sdk 调用名称
  sdkName?: string;
  // API 路径
  path?: string;
  // API http方法
  httpMethod?: string;
  // 自定义处理函数
  customHandler?: McpHandler;
}

/**
 * 注册工具选项
 */
export interface ToolsFilterOptions {
  // 语言
  language?: 'zh' | 'en';
  // 允许的工具
  allowTools?: ToolName[];
  // 允许的业务域
  allowProjects?: ProjectName[];
}

export type LarkClientOptions = Partial<ConstructorParameters<typeof lark.Client>[0]>;

export interface LarkMcpToolOptions extends LarkClientOptions {
  client?: lark.Client;
  appId?: string;
  appSecret?: string;
  // 工具选项
  toolsOptions?: ToolsFilterOptions;
}
