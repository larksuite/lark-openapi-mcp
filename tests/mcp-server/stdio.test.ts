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
  LarkAuthHandlerLocal: jest.fn().mockImplementation(() => ({
    setupRoutes: jest.fn(),
  })),
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

    // 清理事件监听器以避免内存泄漏警告
    process.removeAllListeners('SIGINT');
    process.removeAllListeners('SIGTERM');
    process.stdin.removeAllListeners('close');
    process.stdin.removeAllListeners('end');
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
    expect(console.error).toHaveBeenCalledWith('[ERROR] [StdioServerTransport] MCP Connect Error: Error: Connection error');
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
      domain: 'test.domain.com',
      oauth: true,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const getNewServerMock = jest.fn().mockReturnValue(new McpServer());

    // 需要设置needAuthFlow为true
    await initStdioServer(getNewServerMock, options, { needAuthFlow: true });

    // 验证LarkAuthHandlerLocal被创建
    expect(LarkAuthHandlerLocal).toHaveBeenCalled();

    // 获取传递给getNewServer的参数
    const calledArgs = getNewServerMock.mock.calls[0];
    const [serverOptions, authHandler] = calledArgs;

    // 验证传递了正确的选项和认证处理器
    expect(serverOptions).toEqual(expect.objectContaining(options));
    expect(authHandler).toBeDefined();
  });

  describe('Graceful shutdown handling', () => {
    it('应该注册SIGINT信号处理器', async () => {
      const processOnSpy = jest.spyOn(process, 'on');

      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const mockServer = {
        connect: jest.fn().mockResolvedValue(undefined),
        close: jest.fn(),
      };

      const getNewServerMock = jest.fn().mockReturnValue(mockServer);

      await initStdioServer(getNewServerMock, options);

      // 验证SIGINT处理器被注册
      expect(processOnSpy).toHaveBeenCalledWith('SIGINT', expect.any(Function));

      processOnSpy.mockRestore();
    });

    it('应该注册SIGTERM信号处理器', async () => {
      const processOnSpy = jest.spyOn(process, 'on');

      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const mockServer = {
        connect: jest.fn().mockResolvedValue(undefined),
        close: jest.fn(),
      };

      const getNewServerMock = jest.fn().mockReturnValue(mockServer);

      await initStdioServer(getNewServerMock, options);

      // 验证SIGTERM处理器被注册
      expect(processOnSpy).toHaveBeenCalledWith('SIGTERM', expect.any(Function));

      processOnSpy.mockRestore();
    });

    it('应该注册stdin close事件处理器', async () => {
      const stdinOnSpy = jest.spyOn(process.stdin, 'on');

      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const mockServer = {
        connect: jest.fn().mockResolvedValue(undefined),
        close: jest.fn(),
      };

      const getNewServerMock = jest.fn().mockReturnValue(mockServer);

      await initStdioServer(getNewServerMock, options);

      // 验证stdin close处理器被注册
      expect(stdinOnSpy).toHaveBeenCalledWith('close', expect.any(Function));

      stdinOnSpy.mockRestore();
    });

    it('应该注册stdin end事件处理器', async () => {
      const stdinOnSpy = jest.spyOn(process.stdin, 'on');

      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const mockServer = {
        connect: jest.fn().mockResolvedValue(undefined),
        close: jest.fn(),
      };

      const getNewServerMock = jest.fn().mockReturnValue(mockServer);

      await initStdioServer(getNewServerMock, options);

      // 验证stdin end处理器被注册
      expect(stdinOnSpy).toHaveBeenCalledWith('end', expect.any(Function));

      stdinOnSpy.mockRestore();
    });

    it('应该在cleanup时调用authHandler.stopServer', async () => {
      const { LarkAuthHandlerLocal } = require('../../src/auth');
      const mockStopServer = jest.fn().mockResolvedValue(undefined);

      // 重新模拟 LarkAuthHandlerLocal
      (LarkAuthHandlerLocal as jest.Mock).mockImplementation(() => ({
        setupRoutes: jest.fn(),
        stopServer: mockStopServer,
      }));

      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        oauth: true,
      };

      const mockServer = {
        connect: jest.fn().mockResolvedValue(undefined),
        close: jest.fn(),
      };

      const getNewServerMock = jest.fn().mockReturnValue(mockServer);
      const processOnSpy = jest.spyOn(process, 'on');

      await initStdioServer(getNewServerMock, options, { needAuthFlow: true });

      // 获取注册的cleanup函数
      const sigintCall = processOnSpy.mock.calls.find((call) => call[0] === 'SIGINT');
      expect(sigintCall).toBeDefined();
      const cleanupFn = sigintCall![1] as Function;

      // 调用cleanup函数
      cleanupFn();

      // 等待异步操作完成
      await new Promise((resolve) => setTimeout(resolve, 0));

      // 验证stopServer被调用
      expect(mockStopServer).toHaveBeenCalled();
      expect(process.exit).toHaveBeenCalledWith(0);

      processOnSpy.mockRestore();
    });

    it('应该防止cleanup被多次执行', async () => {
      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const mockServer = {
        connect: jest.fn().mockResolvedValue(undefined),
        close: jest.fn(),
      };

      const getNewServerMock = jest.fn().mockReturnValue(mockServer);
      const processOnSpy = jest.spyOn(process, 'on');

      await initStdioServer(getNewServerMock, options);

      // 获取注册的cleanup函数
      const sigintCall = processOnSpy.mock.calls.find((call) => call[0] === 'SIGINT');
      expect(sigintCall).toBeDefined();
      const cleanupFn = sigintCall![1] as Function;

      // 第一次调用cleanup
      cleanupFn();
      expect(process.exit).toHaveBeenCalledTimes(1);

      // 第二次调用cleanup（应该被阻止）
      cleanupFn();
      // process.exit仍然只应该被调用1次
      expect(process.exit).toHaveBeenCalledTimes(1);

      processOnSpy.mockRestore();
    });

    it('应该在authHandler.stopServer出错时记录错误并继续退出', async () => {
      const { LarkAuthHandlerLocal } = require('../../src/auth');
      const mockStopServer = jest.fn().mockRejectedValue(new Error('Stop server failed'));

      // 重新模拟 LarkAuthHandlerLocal
      (LarkAuthHandlerLocal as jest.Mock).mockImplementation(() => ({
        setupRoutes: jest.fn(),
        stopServer: mockStopServer,
      }));

      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        oauth: true,
      };

      const mockServer = {
        connect: jest.fn().mockResolvedValue(undefined),
        close: jest.fn(),
      };

      const getNewServerMock = jest.fn().mockReturnValue(mockServer);
      const processOnSpy = jest.spyOn(process, 'on');

      await initStdioServer(getNewServerMock, options, { needAuthFlow: true });

      // 获取注册的cleanup函数
      const sigintCall = processOnSpy.mock.calls.find((call) => call[0] === 'SIGINT');
      expect(sigintCall).toBeDefined();
      const cleanupFn = sigintCall![1] as Function;

      // 调用cleanup函数
      cleanupFn();

      // 等待异步操作完成
      await new Promise((resolve) => setTimeout(resolve, 0));

      // 验证错误被记录
      expect(console.error).toHaveBeenCalledWith(
        '[ERROR] [StdioServerTransport] Error stopping auth server: Error: Stop server failed',
      );
      // 验证仍然调用了process.exit
      expect(process.exit).toHaveBeenCalledWith(0);

      processOnSpy.mockRestore();
    });
  });
});
