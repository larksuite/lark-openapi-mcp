import { initStdioServer } from '../../src/mcp-server/transport/stdio';
import { McpServerOptions } from '../../src/mcp-server/shared';

// 创建可追踪的模拟函数
const connectMock = jest.fn().mockResolvedValue(undefined);
const connectErrorMock = jest.fn().mockRejectedValue(new Error('Connection error'));

// 模拟 StdioServerTransport
const mockStdioTransport = {
  connect: jest.fn(),
};

jest.mock('@modelcontextprotocol/sdk/server/stdio', () => ({
  StdioServerTransport: jest.fn().mockImplementation(() => mockStdioTransport),
}));

// 模拟 authStore
jest.mock('../../src/auth', () => ({
  authStore: {
    getLocalAccessToken: jest.fn().mockResolvedValue('mock-local-token'),
  },
  LarkAuthHandlerLocal: jest.fn(),
}));

// 模拟 express
jest.mock('express', () => {
  const mockApp = {
    use: jest.fn(),
    listen: jest.fn(),
  };
  const mockExpress = jest.fn(() => mockApp);
  // 使用 Object.assign 来添加 json 方法
  Object.assign(mockExpress, {
    json: jest.fn(),
  });
  return mockExpress;
});

// 保存原始console
const originalConsole = console;

describe('initStdioServer', () => {
  beforeEach(() => {
    // 重置所有模拟
    jest.clearAllMocks();

    // 模拟console方法
    console.log = jest.fn();
    console.error = jest.fn();

    // 模拟process方法
    jest.spyOn(process, 'exit').mockImplementation((code?: string | number | null) => {
      return undefined as never;
    });
  });

  afterEach(() => {
    // 恢复原始console
    console = originalConsole;

    // 清除所有模拟
    jest.restoreAllMocks();
  });

  it('应该初始化MCP服务器并连接', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const mockServer = {
      connect: connectMock,
      close: jest.fn(),
    };

    const getNewServerMock = jest.fn().mockReturnValue(mockServer);

    // 调用initStdioServer
    await initStdioServer(getNewServerMock, options);

    // 验证调用
    expect(getNewServerMock).toHaveBeenCalled();
    expect(connectMock).toHaveBeenCalled();
  });

  it('应该处理连接错误', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const mockServer = {
      connect: connectErrorMock,
      close: jest.fn(),
    };

    const getNewServerMock = jest.fn().mockReturnValue(mockServer);

    // 调用initStdioServer
    await initStdioServer(getNewServerMock, options);

    // 等待异步操作完成
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 验证错误处理
    expect(connectErrorMock).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('[StdioServerTransport] MCP Connect Error: Error: Connection error');
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('应该正确处理和传递用户指定的选项', async () => {
    const options: McpServerOptions = {
      appId: 'custom-app-id',
      appSecret: 'custom-app-secret',
      host: 'localhost',
      port: 3000,
      tools: ['tool1', 'tool2'],
      language: 'zh',
      toolNameCase: 'camel',
    };

    // 创建一个自定义的getNewServer函数来验证选项传递
    const getNewServerMock = jest.fn().mockReturnValue({
      connect: jest.fn().mockResolvedValue(undefined),
      close: jest.fn(),
    });

    // 调用initStdioServer
    await initStdioServer(getNewServerMock, options);

    // 验证getNewServer被调用
    expect(getNewServerMock).toHaveBeenCalled();
  });

  it('应该在transport.connect成功后不调用process.exit', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
    };

    // 创建带有成功connect的模拟服务器
    const mockServer = {
      connect: jest.fn().mockResolvedValue(undefined),
      close: jest.fn(),
    };

    const getNewServerMock = jest.fn().mockReturnValue(mockServer);

    // 调用initStdioServer
    await initStdioServer(getNewServerMock, options);

    // 等待潜在的异步操作完成
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 验证在成功情况下process.exit不被调用
    expect(process.exit).not.toHaveBeenCalled();
    expect(mockServer.connect).toHaveBeenCalled();
  });

  it('应该在有userAccessToken时不创建LarkAuthHandlerLocal', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      userAccessToken: 'user-token',
    };

    const mockServer = {
      connect: jest.fn().mockResolvedValue(undefined),
      close: jest.fn(),
    };

    const getNewServerMock = jest.fn().mockReturnValue(mockServer);

    // 调用initStdioServer
    await initStdioServer(getNewServerMock, options);

    // 验证getNewServer被正确调用
    expect(getNewServerMock).toHaveBeenCalled();

    // 获取传递给getNewServer的参数
    const calledArgs = getNewServerMock.mock.calls[0];
    expect(calledArgs).toHaveLength(2);

    // 第二个参数应该是undefined（没有authHandler）
    expect(calledArgs[1]).toBeUndefined();
  });

  it('应该在没有userAccessToken和appId时正确处理', async () => {
    const options: McpServerOptions = {
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
      // 没有 userAccessToken 和 appId
    };

    const mockServer = {
      connect: jest.fn().mockResolvedValue(undefined),
      close: jest.fn(),
    };

    const getNewServerMock = jest.fn().mockReturnValue(mockServer);

    // 调用initStdioServer
    await initStdioServer(getNewServerMock, options);

    // 验证getNewServer被正确调用
    expect(getNewServerMock).toHaveBeenCalled();

    // 获取传递给getNewServer的参数
    const calledArgs = getNewServerMock.mock.calls[0];
    const passedOptions = calledArgs[0];

    // userAccessToken应该是undefined
    expect(passedOptions.userAccessToken).toBeUndefined();
  });

  it('应该在没有userAccessToken时创建LarkAuthHandlerLocal', async () => {
    const { LarkAuthHandlerLocal } = require('../../src/auth');

    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
      domain: 'https://open.feishu.cn',
    };

    const mockServer = {
      connect: jest.fn().mockResolvedValue(undefined),
      close: jest.fn(),
    };

    const getNewServerMock = jest.fn().mockReturnValue(mockServer);

    // 调用initStdioServer
    await initStdioServer(getNewServerMock, options);

    // 验证getNewServer被正确调用
    expect(getNewServerMock).toHaveBeenCalled();

    // 验证LarkAuthHandlerLocal被创建
    expect(LarkAuthHandlerLocal).toHaveBeenCalled();

    // 获取传递给getNewServer的参数
    const calledArgs = getNewServerMock.mock.calls[0];
    expect(calledArgs).toHaveLength(2);

    // 第二个参数应该是authHandler实例
    expect(calledArgs[1]).toBeDefined();
  });
});
