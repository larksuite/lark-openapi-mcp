import { recallDeveloperDocument } from '../../../../src/mcp-tool/document-tool/recall/request';
import { DocumentRecallToolOptions } from '../../../../src/mcp-tool/document-tool/recall/type';
import { commonHttpInstance } from '../../../../src/utils/http-instance';

// 模拟http-instance
jest.mock('../../../../src/utils/http-instance');
const mockedHttpInstance = commonHttpInstance as jest.Mocked<typeof commonHttpInstance>;

describe('recallDeveloperDocument', () => {
  // 每个测试前重置模拟
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('应该使用正确的URL和参数发送请求', async () => {
    // 模拟响应数据
    const mockResponse = {
      data: {
        chunks: ['result1', 'result2', 'result3', 'result4'],
      },
    };
    mockedHttpInstance.post.mockResolvedValueOnce(mockResponse);

    // 测试参数
    const query = 'test query';
    const options: DocumentRecallToolOptions = {
      domain: 'https://example.com',
      count: 3,
    };

    // 调用函数
    await recallDeveloperDocument(query, options);

    // 验证请求参数
    expect(mockedHttpInstance.post).toHaveBeenCalledWith(
      'https://example.com/document_portal/v1/recall',
      { question: query },
      {
        timeout: 10000,
      },
    );
  });

  it('应该返回指定数量的结果', async () => {
    // 模拟响应数据
    const mockResponse = {
      data: {
        chunks: ['result1', 'result2', 'result3', 'result4'],
      },
    };
    mockedHttpInstance.post.mockResolvedValueOnce(mockResponse);

    // 测试参数
    const query = 'test query';
    const options: DocumentRecallToolOptions = {
      domain: 'https://example.com',
      count: 2,
    };

    // 调用函数并获取结果
    const results = await recallDeveloperDocument(query, options);

    // 验证返回结果数量
    expect(results).toHaveLength(2);
    expect(results).toEqual(['result1', 'result2']);
  });

  it('应该使用默认数量（3）当未指定count时', async () => {
    // 模拟响应数据
    const mockResponse = {
      data: {
        chunks: ['result1', 'result2', 'result3', 'result4', 'result5'],
      },
    };
    mockedHttpInstance.post.mockResolvedValueOnce(mockResponse);

    // 测试参数，不包含count
    const query = 'test query';
    const options: DocumentRecallToolOptions = {
      domain: 'https://example.com',
    };

    // 调用函数并获取结果
    const results = await recallDeveloperDocument(query, options);

    // 验证返回结果数量为默认值3
    expect(results).toHaveLength(3);
    expect(results).toEqual(['result1', 'result2', 'result3']);
  });

  it('应该返回空数组当chunks为空时', async () => {
    // 模拟响应数据
    const mockResponse = {
      data: {
        chunks: [],
      },
    };
    mockedHttpInstance.post.mockResolvedValueOnce(mockResponse);

    // 测试参数
    const query = 'test query';
    const options: DocumentRecallToolOptions = {
      domain: 'https://example.com',
      count: 3,
    };

    // 调用函数并获取结果
    const results = await recallDeveloperDocument(query, options);

    // 验证返回结果为空数组
    expect(results).toEqual([]);
  });

  it('应该返回空数组当响应中没有chunks字段时', async () => {
    // 模拟响应数据
    const mockResponse = {
      data: {},
    };
    mockedHttpInstance.post.mockResolvedValueOnce(mockResponse);

    // 测试参数
    const query = 'test query';
    const options: DocumentRecallToolOptions = {
      domain: 'https://example.com',
      count: 3,
    };

    // 调用函数并获取结果
    const results = await recallDeveloperDocument(query, options);

    // 验证返回结果为空数组
    expect(results).toEqual([]);
  });

  it('应该抛出错误当请求失败时', async () => {
    // 模拟网络错误
    const errorMessage = 'Network Error';
    mockedHttpInstance.post.mockRejectedValueOnce(new Error(errorMessage));

    // 测试参数
    const query = 'test query';
    const options: DocumentRecallToolOptions = {
      domain: 'https://example.com',
      count: 3,
    };

    // 验证函数抛出预期的错误
    await expect(recallDeveloperDocument(query, options)).rejects.toThrow(errorMessage);
  });
});
