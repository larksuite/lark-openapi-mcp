import * as lark from '@larksuiteoapi/node-sdk';
import { ProjectName, ToolName } from '../tools';
import { CallToolResult } from '@modelcontextprotocol/sdk/types';

export interface TokenRefreshOptions {
  refreshThresholdMinutes?: number;
  maxRetries?: number;
  retryDelayMs?: number;
  tokenExpiresInSeconds?: number;
  onTokenRefreshed?: (tokenInfo: any) => void;
  onRefreshError?: (error: Error) => void;
}

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
  // 令牌类型
  accessTokens?: string[];
  // 是否支持文件上传
  supportFileUpload?: boolean;
  // 是否支持文件下载
  supportFileDownload?: boolean;
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
  // 令牌类型
  tokenMode?: TokenMode;
}

export type LarkClientOptions = Partial<ConstructorParameters<typeof lark.Client>[0]>;

export interface LarkMcpToolOptions extends LarkClientOptions {
  client?: lark.Client;
  appId?: string;
  appSecret?: string;
  // 工具选项
  toolsOptions?: ToolsFilterOptions;
  tokenMode?: TokenMode;
  // 用户访问令牌
  userAccessToken?: string;
  // 自动刷新令牌（默认开启）
  autoRefreshToken?: boolean;
  // 刷新令牌配置
  refreshTokenOptions?: TokenRefreshOptions;
  // 初始刷新令牌
  refreshToken?: string;
}
