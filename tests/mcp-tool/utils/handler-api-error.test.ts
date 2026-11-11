import { larkOapiHandler } from '../../../src/mcp-tool/utils/handler';

jest.unmock('../../../src/mcp-tool/utils/handler');

describe('returned OpenAPI error responses', () => {
  const tool = {
    name: 'bitable.v1.appTableRecord.create',
    description: 'Create a record',
    project: 'bitable',
    schema: {},
    sdkName: 'bitable.appTableRecord.create',
    httpMethod: 'POST',
    path: '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records',
  };

  it.each(['sdk', 'request'])('marks a resolved business error from %s as a tool error', async (route) => {
    const response = {
      code: 1254002,
      msg: 'Fail',
      data: {},
      error: { log_id: 'synthetic-log-id' },
    };
    const call = jest.fn().mockResolvedValue(response);
    const client =
      route === 'sdk'
        ? { bitable: { appTableRecord: { create: (...args: any[]) => call(...args) } } }
        : { request: call };

    const result = await larkOapiHandler(client as any, { data: { fields: {} } }, { tool });

    expect(result).toEqual({
      isError: true,
      content: [{ type: 'text', text: JSON.stringify(response) }],
    });
    expect(call).toHaveBeenCalledTimes(1);
  });

  it.each([
    { code: 99991663, msg: 'Access token invalid' },
    { code: 99991679, msg: 'Permission denied', data: null },
    { code: 1254002, msg: 'Fail', data: { detail: 'synthetic diagnostic' } },
  ])('preserves the full error envelope for code $code', async (response) => {
    const client = { request: jest.fn().mockResolvedValue(response) };

    const result = await larkOapiHandler(client as any, {}, { tool });

    expect(result.isError).toBe(true);
    expect(JSON.parse(result.content[0].text as string)).toEqual(response);
  });

  it.each([
    [{ code: 0, msg: 'success', data: { record_id: 'synthetic-record' } }, { record_id: 'synthetic-record' }],
    [
      { code: 0, msg: 'success' },
      { code: 0, msg: 'success' },
    ],
    [{ data: { record_id: 'synthetic-record' } }, { record_id: 'synthetic-record' }],
    [
      { code: 0, data: { code: 123, label: 'business field' } },
      { code: 123, label: 'business field' },
    ],
  ])('keeps successful response serialization unchanged (%j)', async (response, expected) => {
    const client = { request: jest.fn().mockResolvedValue(response) };

    const result = await larkOapiHandler(client as any, {}, { tool });

    expect(result).toEqual({ content: [{ type: 'text', text: JSON.stringify(expected) }] });
  });
});
