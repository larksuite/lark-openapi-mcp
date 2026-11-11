import * as http from 'http';
import { AddressInfo } from 'net';
import * as lark from '@larksuiteoapi/node-sdk';
import axios from 'axios';
import { larkOapiHandler } from '../../../src/mcp-tool/utils/handler';

jest.unmock('@larksuiteoapi/node-sdk');
jest.unmock('../../../src/mcp-tool/utils/handler');

it('reports an HTTP 200 business error returned by the real SDK', async () => {
  const response = { code: 1254002, msg: 'Fail', data: {} };
  const requests: string[] = [];
  const server = http.createServer((request, reply) => {
    requests.push(request.url || '');
    request.resume();
    reply.writeHead(200, { 'Content-Type': 'application/json' });
    reply.end(JSON.stringify(response));
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));

  try {
    const httpInstance = axios.create({ proxy: false });
    httpInstance.interceptors.request.use((config) => {
      const url = new URL(config.url!);
      config.url = `http://127.0.0.1:${(server.address() as AddressInfo).port}${url.pathname}${url.search}`;
      return config;
    });
    // Match the SDK's default HTTP instance, which returns the response body.
    httpInstance.interceptors.response.use((reply) => reply.data);
    const client = new lark.Client({
      appId: 'synthetic-app',
      appSecret: 'synthetic-secret',
      httpInstance,
      logger: { trace: jest.fn(), debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() },
    });
    const result = await larkOapiHandler(
      client,
      {
        path: { app_token: 'synthetic-app-token', table_id: 'synthetic-table' },
        data: { fields: {} },
        useUAT: true,
      },
      {
        tool: {
          name: 'bitable.v1.appTableRecord.create',
          description: 'Create a record',
          project: 'bitable',
          schema: {},
          sdkName: 'bitable.appTableRecord.create',
        },
        userAccessToken: 'synthetic-user-token',
      },
    );

    expect(requests).toEqual(['/open-apis/bitable/v1/apps/synthetic-app-token/tables/synthetic-table/records']);
    expect(result).toEqual({
      isError: true,
      content: [{ type: 'text', text: JSON.stringify(response) }],
    });
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
});
