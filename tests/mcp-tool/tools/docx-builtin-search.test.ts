import { larkDocxBuiltinSearchTool } from '../../../src/mcp-tool/tools/zh/builtin-tools/docx/builtin';

const handler = larkDocxBuiltinSearchTool.customHandler as any;
const baseParams = { data: { search_key: '工资', count: 10 } };
const okResponse = { data: { code: 0, data: { docs_entities: [] } } };

function makeClient() {
  return { request: jest.fn().mockResolvedValue(okResponse) };
}

describe('docx.builtin.search —— 身份与 token 模式', () => {
  it('声明了 user 和 tenant 两种身份', () => {
    expect(larkDocxBuiltinSearchTool.accessTokens).toEqual(['user', 'tenant']);
  });

  it('没配 user token 且不传 useUAT 时，回落到应用身份，正常返回结果', async () => {
    const client = makeClient();
    const result = await handler(client, { ...baseParams }, {});

    expect(result.isError).toBeUndefined();
    expect(result.content[0].text).toContain('docs_entities');
    expect(client.request).toHaveBeenCalledTimes(1);
    // 应用身份：只传 request 本身，不挂 withUserAccessToken 的结果
    expect(client.request.mock.calls[0]).toHaveLength(1);
    expect(client.request.mock.calls[0][0].url).toBe('/open-apis/suite/docs-api/search/object');
  });

  it('配了 user token 且 useUAT 为 true 时，走用户身份', async () => {
    const client = makeClient();
    await handler(client, { ...baseParams, useUAT: true }, { userAccessToken: 'u-abc' });

    expect(client.request).toHaveBeenCalledTimes(1);
    expect(client.request.mock.calls[0][1]).toEqual({ userAccessToken: 'u-abc' });
  });

  it('没配 user token 但 useUAT 显式为 true 时，报出可操作的错误，而不是去请求', async () => {
    const client = makeClient();
    const result = await handler(client, { ...baseParams, useUAT: true }, {});

    expect(result.isError).toBe(true);
    const msg = JSON.parse(result.content[0].text).msg as string;
    expect(msg).toContain('lark-mcp login');
    expect(client.request).not.toHaveBeenCalled();
  });

  it('配了 user token 但 useUAT 不为 true 时，仍然走应用身份', async () => {
    const client = makeClient();
    await handler(client, { ...baseParams }, { userAccessToken: 'u-abc' });

    expect(client.request.mock.calls[0]).toHaveLength(1);
  });
});
