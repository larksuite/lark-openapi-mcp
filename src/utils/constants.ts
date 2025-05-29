import { currentVersion } from './version';

export const USER_AGENT = `oapi-sdk-mcp/${currentVersion}`;

export const OAPI_MCP_DEFAULT_ARGS = {
  domain: 'https://open.feishu.cn',
  toolNameCase: 'snake',
  language: 'en',
  tokenMode: 'auto',
  mode: 'stdio',
  host: 'localhost',
  port: '3000',
  disableAutoRefresh: false,
  refreshThreshold: '1',
};

export const OAPI_MCP_ENV_ARGS = {
  appId: process.env.APP_ID,
  appSecret: process.env.APP_SECRET,
  userAccessToken: process.env.USER_ACCESS_TOKEN,
  refreshToken: process.env.REFRESH_TOKEN,
  tokenMode: process.env.LARK_TOKEN_MODE,
  tools: process.env.LARK_TOOLS,
  domain: process.env.LARK_DOMAIN,
  disableAutoRefresh: process.env.DISABLE_AUTO_REFRESH === 'true',
  refreshThreshold: process.env.REFRESH_THRESHOLD,
};
