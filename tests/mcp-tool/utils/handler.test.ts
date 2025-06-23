import * as lark from '@larksuiteoapi/node-sdk';
import { larkOapiHandler } from '../../../src/mcp-tool/utils/handler';

// 模拟Client及其方法
jest.mock('@larksuiteoapi/node-sdk', () => {
  const original = jest.requireActual('@larksuiteoapi/node-sdk');
  return {
    ...original,
    withUserAccessToken: jest.fn().mockImplementation((token) => ({ token })),
  };
});

// 不要模拟原始模块
jest.unmock('../../../src/mcp-tool/utils/handler');

describe('larkOapiHandler', () => {
  // 创建测试用的mock函数和对象

  const imCreate = jest.fn();

  const mockClient = {
    im: {
      message: {
        create: (...args: any[]) => imCreate(...args),
      },
    },
    docx: {
      // 空对象，用于测试回退逻辑
    },
    request: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('应该成功处理API调用并返回结果', async () => {
    // 准备测试数据
    const params = { data: { content: 'test message' } };
    const tool = {
      name: 'im.v1.message.create',
      description: '发送消息',
      schema: {},
      project: 'im',
      sdkName: 'im.message.create',
    };

    // 设置成功响应
    imCreate.mockResolvedValueOnce({
      data: { message_id: '123' },
    });

    // 调用函数
    const result = await larkOapiHandler(mockClient as any, params, { tool });

    expect(imCreate).toHaveBeenCalled();
    // 验证结果
    expect(result).toMatchObject({
      content: [
        {
          type: 'text',
          text: '{"message_id":"123"}',
        },
      ],
    });
  });

  it('应该通过测试没有sdkName的情况', async () => {
    // 准备测试数据
    const params = { data: { content: 'test message' } };
    const tool = {
      name: 'im.v1.message.create',
      description: '发送消息',
      schema: {},
      project: 'im',
      // 没有sdkName
    };

    // 调用函数
    const result = await larkOapiHandler(mockClient as any, params, { tool });

    // 验证结果
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('Invalid sdkName');
  });

  it('应该使用User Access Token当useUAT为true', async () => {
    // 准备测试数据
    const params = {
      data: { content: 'test message' },
      useUAT: true,
    };
    const tool = {
      name: 'im.v1.message.create',
      description: '发送消息',
      schema: {},
      project: 'im',
      sdkName: 'im.message.create',
    };
    // 成功响应
    imCreate.mockResolvedValueOnce({
      data: { message_id: '123' },
    });

    // 调用函数
    await larkOapiHandler(mockClient as any, params, { tool, userAccessToken: 'test-token' });

    // 验证withUserAccessToken被调用
    expect(lark.withUserAccessToken).toHaveBeenCalledWith('test-token');
  });

  it('应该使用Tenant Access Token当useUAT为false,没有userAccessToken', async () => {
    // 准备测试数据
    const params = {
      data: { content: 'test message' },
      useUAT: false,
    };
    const tool = {
      name: 'im.v1.message.create',
      description: '发送消息',
      schema: {},
      project: 'im',
      sdkName: 'im.message.create',
    };

    // 成功响应
    imCreate.mockResolvedValueOnce({
      data: { message_id: '123' },
    });

    // 调用函数
    await larkOapiHandler(mockClient as any, params, { tool });

    // 验证withUserAccessToken没有被调用
    expect(lark.withUserAccessToken).not.toHaveBeenCalled();
  });

  it('应该处理非函数的API路径', async () => {
    // 准备测试数据
    const params = { data: { content: 'test message' } };
    const tool = {
      name: 'im.v1.message.nonFunction',
      description: '测试非函数路径',
      schema: {},
      project: 'im',
      sdkName: 'im.message.nonFunction',
      path: '/open-apis/im/v1/message/nonFunction',
      httpMethod: 'POST',
    };

    // 设置非函数路径
    (mockClient as any).im.message.nonFunction = {};

    // 设置request成功响应
    mockClient.request.mockResolvedValueOnce({
      data: { success: true },
    });

    // 调用函数
    const result = await larkOapiHandler(mockClient as any, params, { tool });

    // 验证结果
    expect(result.content[0].text).toBe('{"success":true}');
    expect(mockClient.request).toHaveBeenCalled();
  });

  it('应该使用request当API路径不存在', async () => {
    // 准备测试数据
    const params = { data: { document_id: 'doc123' } };
    const tool = {
      name: 'docx.v1.document.rawContent',
      description: '获取文档内容',
      schema: {},
      project: 'docx',
      sdkName: 'docx.document.rawContent', // 不存在于mockClient中
      path: '/open-apis/docx/v1/document/rawContent',
      httpMethod: 'GET',
    };

    // 设置成功响应
    mockClient.request.mockResolvedValueOnce({
      data: { content: 'document content' },
    });

    // 调用函数
    const result = await larkOapiHandler(mockClient as any, params, { tool });

    // 验证结果
    expect(result).toMatchObject({
      content: [
        {
          type: 'text',
          text: '{"content":"document content"}',
        },
      ],
    });
  });

  it('应该通过测试user_access_token模式且没有token', async () => {
    // 准备测试数据
    const params = { data: { content: 'test message' }, useUAT: true };
    const tool = {
      name: 'im.v1.message.create',
      description: '发送消息',
      schema: {},
      project: 'im',
      sdkName: 'im.message.create',
    };

    // 调用函数
    const result = await larkOapiHandler(mockClient as any, params, { tool });

    // 验证结果
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toBe('"UserAccessToken is invalid or expired"');
  });

  it('应该测试error处理', async () => {
    // 准备测试数据
    const params = { data: { content: 'test message' } };
    const tool = {
      name: 'im.v1.message.create',
      description: '发送消息',
      schema: {},
      project: 'im',
      sdkName: 'im.message.create',
    };
    // 设置失败响应
    imCreate.mockRejectedValueOnce('API error');
    // 调用函数
    const result = await larkOapiHandler(mockClient as any, params, { tool });

    // 验证结果
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toBe('"API error"');
  });

  it('应该测试error undefined处理', async () => {
    // 准备测试数据
    const params = { data: { content: 'test message' } };
    const tool = {
      name: 'im.v1.message.create',
      description: '发送消息',
      schema: {},
      project: 'im',
      sdkName: 'im.message.create',
    };
    // 设置失败响应
    imCreate.mockRejectedValueOnce(undefined);
    // 调用函数
    const result = await larkOapiHandler(mockClient as any, params, { tool });

    // 验证结果
    expect(result.isError).toBe(true);
  });

  it('应该测试error message处理', async () => {
    // 准备测试数据
    const params = { data: { content: 'test message' } };
    const tool = {
      name: 'im.v1.message.create',
      description: '发送消息',
      schema: {},
      project: 'im',
      sdkName: 'im.message.create',
    };
    // 设置失败响应
    imCreate.mockRejectedValueOnce({ message: 'API error' });
    // 调用函数
    const result = await larkOapiHandler(mockClient as any, params, { tool });

    // 验证结果
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toBe('"API error"');
  });

  it('应该测试error response处理', async () => {
    // 准备测试数据
    const params = { data: { content: 'test message' } };
    const tool = {
      name: 'im.v1.message.create',
      description: '发送消息',
      schema: {},
      project: 'im',
      sdkName: 'im.message.create',
    };
    // 设置失败响应
    imCreate.mockRejectedValueOnce({ response: { data: { code: 123, msg: 'API error' } } });
    // 调用函数
    const result = await larkOapiHandler(mockClient as any, params, { tool });

    // 验证结果
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toBe('{"code":123,"msg":"API error"}');
  });

  it('应该处理缺少options参数的情况', async () => {
    // 准备测试数据
    const params = { data: { content: 'test message' } };
    // 调用函数但不传options参数
    const result = await larkOapiHandler(mockClient as any, params, undefined as any);
    // 验证结果，应该处理错误
    expect(result.content[0].text).toBe('"Invalid sdkName"');
  });

  it('应该有userAccessToken，没有params', async () => {
    const tool = {
      name: 'im.v1.message.create',
      description: '发送消息',
      schema: {},
      project: 'im',
      sdkName: 'im.message.create',
    };
    await larkOapiHandler(mockClient as any, undefined as any, { tool, userAccessToken: 'test-token' });
    // 验证withUserAccessToken没有被调用
    expect(lark.withUserAccessToken).not.toHaveBeenCalled();
  });
});
