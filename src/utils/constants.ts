import { cleanEnvArgs } from './clean-env-args';
import { currentVersion } from './version';
import envPaths from 'env-paths';

export const ENV_PATHS = envPaths('lark-mcp');

const [major] = process.versions.node.split('.').map(Number);

export const USER_AGENT = `oapi-sdk-mcp/${currentVersion}`;
export const NODE_VERSION_MAJOR = major;

export const OAPI_MCP_DEFAULT_ARGS = {
  domain: 'https://open.feishu.cn',
  toolNameCase: 'snake',
  language: 'en',
  tokenMode: 'auto',
  mode: 'stdio',
  host: 'localhost',
  port: '3000',
};

export const OAPI_MCP_ENV_ARGS = cleanEnvArgs({
  appId: process.env.APP_ID,
  appSecret: process.env.APP_SECRET,
  userAccessToken: process.env.USER_ACCESS_TOKEN,
  tokenMode: process.env.LARK_TOKEN_MODE,
  tools: process.env.LARK_TOOLS,
  domain: process.env.LARK_DOMAIN,
});

export enum OAPI_MCP_ERROR_CODE {
  USER_ACCESS_TOKEN_INVALID = 99991668,
  USER_ACCESS_TOKEN_UNAUTHORIZED = 99991679,
}
