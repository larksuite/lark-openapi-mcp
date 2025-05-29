import * as larkmcp from '../../mcp-tool';
export interface McpServerOptions {
  appId?: string;
  appSecret?: string;
  domain?: string;
  tools?: string | string[];
  userAccessToken?: string;
  refreshToken?: string;
  language?: 'zh' | 'en';
  toolNameCase?: larkmcp.ToolNameCase;
  tokenMode?: larkmcp.TokenMode;
  disableAutoRefresh?: boolean;
  refreshThreshold?: string;
  host: string;
  port: number;
}
