import * as lark from '@larksuiteoapi/node-sdk';
import { McpHandler, McpHandlerOptions } from '../types';
import { logger } from '../../utils/logger';

const sdkFuncCall = async (client: lark.Client, params: any, options: McpHandlerOptions) => {
  const { tool, userAccessToken } = options || {};
  const { sdkName, path, httpMethod } = tool || {};

  if (!sdkName) {
    logger.error(`[larkOapiHandler] Invalid sdkName`);
    throw new Error('Invalid sdkName');
  }

  const chain = sdkName.split('.');
  let func: any = client;
  for (const element of chain) {
    func = func[element as keyof typeof func];
    if (!func) {
      func = async (params: any, ...args: any) =>
        await client.request({ method: httpMethod, url: path, ...params }, ...args);
      break;
    }
  }
  if (!(func instanceof Function)) {
    func = async (params: any, ...args: any) =>
      await client.request({ method: httpMethod, url: path, ...params }, ...args);
  }

  if (params?.useUAT) {
    if (!userAccessToken) {
      logger.error(`[larkOapiHandler] UserAccessToken is invalid or expired`);
      throw new Error('UserAccessToken is invalid or expired');
    }
    return await func(params, lark.withUserAccessToken(userAccessToken));
  }
  return await func(params);
};

export const larkOapiHandler: McpHandler = async (client, params, options) => {
  try {
    const response = await sdkFuncCall(client, params, options);
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(response?.data ?? response),
        },
      ],
    };
  } catch (error) {
    return {
      isError: true,
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify((error as any)?.response?.data || (error as any)?.message || error),
        },
      ],
    };
  }
};
