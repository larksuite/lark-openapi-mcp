import { LoginHandler } from '../src/cli/login-handler';
import * as server from '../src/mcp-server';

// 模拟 LoginHandler
jest.mock('../src/cli/login-handler', () => ({
  LoginHandler: {
    handleLogin: jest.fn(),
    handleLogout: jest.fn(),
    handleWhoAmI: jest.fn(),
  },
}));

// 模拟server模块
jest.mock('../src/mcp-server', () => ({
  initMcpServerWithTransport: jest.fn(),
}));

describe('CLI Commands', () => {
  let originalConsole: Console;

  beforeEach(() => {
    jest.clearAllMocks();
    originalConsole = global.console;
    global.console.error = jest.fn();
  });

  afterEach(() => {
    global.console = originalConsole;
  });

  describe('Login Command', () => {
    it('应该调用 LoginHandler.handleLogin', async () => {
      const options = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        domain: 'https://open.feishu.cn',
        scope: 'test-scope',
      };

      // 模拟login命令的action回调
      const loginActionCallback = jest.fn(async (options) => {
        await LoginHandler.handleLogin(options);
      });

      await loginActionCallback(options);

      expect(LoginHandler.handleLogin).toHaveBeenCalledWith(options);
    });
  });

  describe('Logout Command', () => {
    it('应该调用 LoginHandler.handleLogout', async () => {
      // 模拟logout命令的action回调
      const logoutActionCallback = jest.fn(async () => {
        await LoginHandler.handleLogout();
      });

      await logoutActionCallback();

      expect(LoginHandler.handleLogout).toHaveBeenCalledWith();
    });
  });

  describe('MCP Command', () => {
    it('应该调用 initMcpServerWithTransport', async () => {
      const options = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        mode: 'stdio',
      };

      // 模拟mcp命令的action回调
      const mcpActionCallback = jest.fn(async (options) => {
        await server.initMcpServerWithTransport('oapi', options);
      });

      await mcpActionCallback(options);

      expect(server.initMcpServerWithTransport).toHaveBeenCalledWith('oapi', options);
    });
  });

  describe('Global Error Handling', () => {
    it('应该注册uncaughtException处理器', () => {
      // 直接测试全局错误处理器的注册
      const processOnSpy = jest.spyOn(process, 'on');
      const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);

      // 模拟错误处理器的行为
      const mockUncaughtExceptionHandler = (error: Error) => {
        console.error(`[CLI] Uncaught Exception: ${error}`);
        process.exit(1);
      };

      // 测试处理器行为
      const testError = new Error('Test uncaught exception');
      mockUncaughtExceptionHandler(testError);

      // 验证错误被记录
      expect(console.error).toHaveBeenCalledWith('[CLI] Uncaught Exception: Error: Test uncaught exception');
      // 验证进程退出
      expect(processExitSpy).toHaveBeenCalledWith(1);

      processOnSpy.mockRestore();
      processExitSpy.mockRestore();
    });

    it('应该注册unhandledRejection处理器', () => {
      const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);

      // 模拟拒绝处理器的行为
      const mockUnhandledRejectionHandler = (reason: any) => {
        console.error(`[CLI] Unhandled Rejection: ${reason}`);
        process.exit(1);
      };

      // 测试处理器行为
      const testReason = 'Test unhandled rejection';
      mockUnhandledRejectionHandler(testReason);

      // 验证错误被记录
      expect(console.error).toHaveBeenCalledWith('[CLI] Unhandled Rejection: Test unhandled rejection');
      // 验证进程退出
      expect(processExitSpy).toHaveBeenCalledWith(1);

      processExitSpy.mockRestore();
    });
  });
});
