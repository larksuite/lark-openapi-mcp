import { LoginHandler } from '../../src/cli/login-handler';
import { authStore } from '../../src/auth/store';

// Mock all dependencies before importing
jest.mock('../../src/auth/store', () => ({
  authStore: {
    getLocalAccessToken: jest.fn(),
    removeLocalAccessToken: jest.fn(),
    removeAllLocalAccessTokens: jest.fn(),
    getAllLocalAccessTokens: jest.fn(),
    getToken: jest.fn(),
  },
}));

// Mock isTokenExpired
jest.mock('../../src/auth/utils', () => ({
  isTokenExpired: jest.fn(),
}));

// Mock the entire handler-local module
jest.mock('../../src/auth/handler/handler-local', () => ({
  LarkAuthHandlerLocal: jest.fn().mockImplementation(() => ({
    reAuthorize: jest.fn(),
  })),
}));

// Mock provider
jest.mock('../../src/auth/provider', () => ({
  LarkProxyOAuthServerProvider: jest.fn().mockImplementation(() => ({})),
}));

// Mock SDK router
jest.mock('@modelcontextprotocol/sdk/server/auth/router.js', () => ({
  mcpAuthRouter: jest.fn(() => (req: any, res: any, next: any) => next()),
}));

// Mock express
jest.mock('express', () => {
  const mockApp = {
    use: jest.fn(),
    get: jest.fn(),
    listen: jest.fn(),
  };
  const expressFn = jest.fn(() => mockApp);
  (expressFn as any).json = jest.fn(() => (req: any, res: any, next: any) => next());
  return expressFn;
});

// Import the mocked class after setting up mocks
import { LarkAuthHandlerLocal } from '../../src/auth/handler/handler-local';
import { isTokenExpired } from '../../src/auth/utils';

// Mock console methods
const consoleSpy = {
  log: jest.spyOn(console, 'log').mockImplementation(),
  error: jest.spyOn(console, 'error').mockImplementation(),
};

// Mock process.exit to prevent tests from actually exiting
const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation(() => {
  throw new Error('process.exit called');
});

describe('LoginHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleSpy.log.mockRestore();
    consoleSpy.error.mockRestore();
    mockProcessExit.mockRestore();
  });

  describe('checkTokenWithTimeout', () => {
    it('应该在找到token时返回true', async () => {
      // Mock authStore to return a token immediately
      (authStore.getLocalAccessToken as jest.Mock).mockResolvedValue('found-token');

      const result = await LoginHandler.checkTokenWithTimeout(5000, 'test-app');
      expect(result).toBe(true);
      expect(authStore.getLocalAccessToken).toHaveBeenCalledWith('test-app');
    });

    it('应该在超时时返回false', async () => {
      // Mock authStore to never return a token
      (authStore.getLocalAccessToken as jest.Mock).mockResolvedValue(null);

      // Use a very short timeout to test quickly
      const result = await LoginHandler.checkTokenWithTimeout(100, 'test-app');
      expect(result).toBe(false);
      expect(authStore.getLocalAccessToken).toHaveBeenCalledWith('test-app');
    });
  });

  describe('handleLogin', () => {
    it('应该显示错误信息当缺少必需凭证时', async () => {
      const testCases = [
        { appId: '', appSecret: 'test-secret', description: '缺少appId' },
        { appId: 'test-app-id', appSecret: '', description: '缺少appSecret' },
        { appId: '', appSecret: '', description: '缺少appId和appSecret' },
      ];

      for (const testCase of testCases) {
        const options = {
          appId: testCase.appId,
          appSecret: testCase.appSecret,
          domain: 'test.domain.com',
          host: 'localhost',
          port: '3000',
        };

        await expect(LoginHandler.handleLogin(options)).rejects.toThrow('process.exit called');

        expect(consoleSpy.error).toHaveBeenCalledWith(
          'Error: Missing App Credentials (appId and appSecret are required for login)',
        );
        expect(mockProcessExit).toHaveBeenCalledWith(1);

        // 清除mock调用记录，为下一个测试用例准备
        jest.clearAllMocks();
      }
    });

    it('应该启动OAuth登录流程当需要新授权URL时', async () => {
      const options = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        domain: 'test.domain.com',
        host: 'localhost',
        port: '3000',
        scope: ['test-scope'],
      };

      // Setup mock for successful authorization URL case
      const mockReAuthorize = jest.fn().mockResolvedValue({
        authorizeUrl: 'http://test-auth-url.com',
        accessToken: '',
      });

      (LarkAuthHandlerLocal as jest.MockedClass<typeof LarkAuthHandlerLocal>).mockImplementation(
        () =>
          ({
            reAuthorize: mockReAuthorize,
          }) as any,
      );

      // Mock checkTokenWithTimeout to resolve immediately
      jest.spyOn(LoginHandler, 'checkTokenWithTimeout').mockResolvedValue(true);

      // This test expects process.exit(0) to be called when checkTokenWithTimeout returns true
      await expect(LoginHandler.handleLogin(options)).rejects.toThrow('process.exit called');

      expect(consoleSpy.log).toHaveBeenCalledWith('🔐 Starting OAuth login process...');
      expect(consoleSpy.log).toHaveBeenCalledWith(
        '📱 Please open the following URL in your browser to complete the login:',
      );
      expect(consoleSpy.log).toHaveBeenCalledWith('http://test-auth-url.com');
      expect(consoleSpy.log).toHaveBeenCalledWith('\n⏳ Waiting for authorization... (timeout in 60 seconds)');
      expect(consoleSpy.log).toHaveBeenCalledWith('✅ Successfully logged in');
      expect(mockReAuthorize).toHaveBeenCalled();
      expect(mockProcessExit).toHaveBeenCalledWith(0);
    });

    it('应该启动OAuth登录流程当没有提供scope时', async () => {
      const options = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        domain: 'test.domain.com',
        host: 'localhost',
        port: '3000',
      };

      const mockReAuthorize = jest.fn().mockResolvedValue({
        authorizeUrl: 'http://test-auth-url.com',
        accessToken: '',
      });

      (LarkAuthHandlerLocal as jest.MockedClass<typeof LarkAuthHandlerLocal>).mockImplementation(
        () =>
          ({
            reAuthorize: mockReAuthorize,
          }) as any,
      );

      jest.spyOn(LoginHandler, 'checkTokenWithTimeout').mockResolvedValue(false);

      await expect(LoginHandler.handleLogin(options)).rejects.toThrow('process.exit called');

      expect(consoleSpy.log).toHaveBeenCalledWith('🔐 Starting OAuth login process...');
      expect(consoleSpy.log).toHaveBeenCalledWith(
        '📱 Please open the following URL in your browser to complete the login:',
      );
      expect(consoleSpy.log).toHaveBeenCalledWith('http://test-auth-url.com');
      expect(consoleSpy.log).toHaveBeenCalledWith('\n⏳ Waiting for authorization... (timeout in 60 seconds)');
      expect(consoleSpy.log).toHaveBeenCalledWith('❌ Login failed');
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });

    it('应该显示已登录信息当有有效token时', async () => {
      const options = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        domain: 'test.domain.com',
        host: 'localhost',
        port: '3000',
      };

      const mockReAuthorize = jest.fn().mockResolvedValue({
        authorizeUrl: '',
        accessToken: 'valid-token',
      });

      (LarkAuthHandlerLocal as jest.MockedClass<typeof LarkAuthHandlerLocal>).mockImplementation(
        () =>
          ({
            reAuthorize: mockReAuthorize,
          }) as any,
      );

      await expect(LoginHandler.handleLogin(options)).rejects.toThrow('process.exit called');

      expect(consoleSpy.log).toHaveBeenCalledWith('🔐 Starting OAuth login process...');
      expect(consoleSpy.log).toHaveBeenCalledWith('✅ Already logged in with valid token');
      expect(mockProcessExit).toHaveBeenCalledWith(0);
    });

    it('应该处理登录错误', async () => {
      const options = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        domain: 'test.domain.com',
        host: 'localhost',
        port: '3000',
      };

      const mockReAuthorize = jest.fn().mockRejectedValue(new Error('Auth failed'));

      (LarkAuthHandlerLocal as jest.MockedClass<typeof LarkAuthHandlerLocal>).mockImplementation(
        () =>
          ({
            reAuthorize: mockReAuthorize,
          }) as any,
      );

      await expect(LoginHandler.handleLogin(options)).rejects.toThrow('process.exit called');

      expect(consoleSpy.error).toHaveBeenCalledWith('❌ Login failed:', expect.any(Error));
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });

    it('应该正确创建LarkAuthHandlerLocal实例并转换端口号', async () => {
      const options = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        domain: 'test.domain.com',
        host: 'localhost',
        port: '8080',
        scope: ['test-scope'],
      };

      let capturedApp: any = null;
      let capturedConfig: any = null;
      const mockReAuthorize = jest.fn().mockResolvedValue({
        authorizeUrl: 'http://test-auth-url.com',
        accessToken: '',
      });

      (LarkAuthHandlerLocal as jest.MockedClass<typeof LarkAuthHandlerLocal>).mockImplementation((app, config) => {
        capturedApp = app;
        capturedConfig = config;
        return {
          reAuthorize: mockReAuthorize,
        } as any;
      });

      jest.spyOn(LoginHandler, 'checkTokenWithTimeout').mockResolvedValue(true);

      // This test expects process.exit(0) to be called when checkTokenWithTimeout returns true
      await expect(LoginHandler.handleLogin(options)).rejects.toThrow('process.exit called');

      expect(LarkAuthHandlerLocal).toHaveBeenCalled();
      expect(capturedApp).toBeDefined();
      expect(capturedConfig).toEqual({
        port: 8080, // Should be converted to number
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        scope: ['test-scope'],
      });
      expect(typeof capturedConfig.port).toBe('number');
      expect(mockProcessExit).toHaveBeenCalledWith(0);
    });

    it('应该处理reAuthorize返回空值的边界情况', async () => {
      const options = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        domain: 'test.domain.com',
        host: 'localhost',
        port: '3000',
      };

      const mockReAuthorize = jest.fn().mockResolvedValue({
        authorizeUrl: '',
        accessToken: '',
      });

      (LarkAuthHandlerLocal as jest.MockedClass<typeof LarkAuthHandlerLocal>).mockImplementation(
        () =>
          ({
            reAuthorize: mockReAuthorize,
          }) as any,
      );

      await expect(LoginHandler.handleLogin(options)).rejects.toThrow('process.exit called');

      expect(consoleSpy.log).toHaveBeenCalledWith('🔐 Starting OAuth login process...');
      // Should not call either branch since both are falsy
      expect(consoleSpy.log).not.toHaveBeenCalledWith('✅ Already logged in with valid token');
      expect(consoleSpy.log).not.toHaveBeenCalledWith(
        '📱 Please open the following URL in your browser to complete the login:',
      );
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });
  });

  describe('handleLogout', () => {
    it('应该成功登出并清除token', async () => {
      const appId = 'test-app-id';
      (authStore.getLocalAccessToken as jest.Mock).mockResolvedValue('valid-token');
      (authStore.removeLocalAccessToken as jest.Mock).mockResolvedValue(undefined);

      await expect(LoginHandler.handleLogout(appId)).rejects.toThrow('process.exit called');

      expect(consoleSpy.log).toHaveBeenCalledWith('🔓 Logging out...');
      expect(authStore.removeLocalAccessToken).toHaveBeenCalledWith(appId);
      expect(consoleSpy.log).toHaveBeenCalledWith(`✅ Successfully logged out from app: ${appId}`);
      expect(mockProcessExit).toHaveBeenCalledWith(0);
    });

    it('应该显示没有活动会话信息当token为falsy时', async () => {
      const appId = 'test-app-id';
      (authStore.getLocalAccessToken as jest.Mock).mockResolvedValue(null);

      await expect(LoginHandler.handleLogout(appId)).rejects.toThrow('process.exit called');

      expect(consoleSpy.log).toHaveBeenCalledWith('🔓 Logging out...');
      expect(consoleSpy.log).toHaveBeenCalledWith(`ℹ️ No active login session found for app: ${appId}`);
      expect(authStore.removeLocalAccessToken).not.toHaveBeenCalled();
      expect(mockProcessExit).toHaveBeenCalledWith(0);
    });

    it('应该处理缺少appId的情况并登出所有应用', async () => {
      (authStore.removeAllLocalAccessTokens as jest.Mock).mockResolvedValue(undefined);

      await expect(LoginHandler.handleLogout()).rejects.toThrow('process.exit called');

      expect(consoleSpy.log).toHaveBeenCalledWith('🔓 Logging out...');
      expect(authStore.removeAllLocalAccessTokens).toHaveBeenCalled();
      expect(consoleSpy.log).toHaveBeenCalledWith('✅ Successfully logged out from all apps');
      expect(mockProcessExit).toHaveBeenCalledWith(0);
    });

    it('应该处理getLocalAccessToken错误', async () => {
      const appId = 'test-app-id';
      (authStore.getLocalAccessToken as jest.Mock).mockRejectedValue(new Error('Storage error'));

      await expect(LoginHandler.handleLogout(appId)).rejects.toThrow('process.exit called');

      expect(consoleSpy.error).toHaveBeenCalledWith('❌ Logout failed:', expect.any(Error));
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });

    it('应该处理removeLocalAccessToken错误', async () => {
      const appId = 'test-app-id';
      (authStore.getLocalAccessToken as jest.Mock).mockResolvedValue('valid-token');
      (authStore.removeLocalAccessToken as jest.Mock).mockRejectedValue(new Error('Remove failed'));

      await expect(LoginHandler.handleLogout(appId)).rejects.toThrow('process.exit called');

      expect(consoleSpy.log).toHaveBeenCalledWith('🔓 Logging out...');
      expect(authStore.removeLocalAccessToken).toHaveBeenCalledWith(appId);
      expect(consoleSpy.error).toHaveBeenCalledWith('❌ Logout failed:', expect.any(Error));
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });
  });

  describe('handleWhoAmI', () => {
    it('应该显示没有活动会话信息当没有token时', async () => {
      (authStore.getAllLocalAccessTokens as jest.Mock).mockResolvedValue({});

      await expect(LoginHandler.handleWhoAmI()).rejects.toThrow('process.exit called');

      expect(consoleSpy.log).toHaveBeenCalledWith('ℹ️ No active login sessions found');
      expect(mockProcessExit).toHaveBeenCalledWith(0);
    });

    it('应该显示单个应用的登录会话信息', async () => {
      const mockTokens = {
        'test-app-id': 'test-access-token-1',
      };
      const mockTokenInfo = {
        accessToken: 'test-access-token-1',
        expiresIn: 7200,
        createdAt: Date.now(),
      };

      (authStore.getAllLocalAccessTokens as jest.Mock).mockResolvedValue(mockTokens);
      (authStore.getToken as jest.Mock).mockResolvedValue(mockTokenInfo);
      (isTokenExpired as jest.Mock).mockReturnValue(false);

      await expect(LoginHandler.handleWhoAmI()).rejects.toThrow('process.exit called');

      expect(consoleSpy.log).toHaveBeenCalledWith('👤 Current login sessions:\n');
      expect(consoleSpy.log).toHaveBeenCalledWith('📱 App ID: test-app-id');
      expect(consoleSpy.log).toHaveBeenCalledWith('⌚️ AccessToken Expired: false');
      expect(consoleSpy.log).toHaveBeenCalledWith('🔐 Token Info:');
      expect(consoleSpy.log).toHaveBeenCalledWith(JSON.stringify(mockTokenInfo, null, 2));
      expect(consoleSpy.log).toHaveBeenCalledWith('\n');
      expect(authStore.getToken).toHaveBeenCalledWith('test-access-token-1');
      expect(isTokenExpired).toHaveBeenCalledWith(mockTokenInfo);
      expect(mockProcessExit).toHaveBeenCalledWith(0);
    });

    it('应该显示多个应用的登录会话信息', async () => {
      const mockTokens = {
        'test-app-id-1': 'test-access-token-1',
        'test-app-id-2': 'test-access-token-2',
      };
      const mockTokenInfo1 = {
        accessToken: 'test-access-token-1',
        expiresIn: 7200,
        createdAt: Date.now(),
      };
      const mockTokenInfo2 = {
        accessToken: 'test-access-token-2',
        expiresIn: 3600,
        createdAt: Date.now() - 3700000, // Older token
      };

      (authStore.getAllLocalAccessTokens as jest.Mock).mockResolvedValue(mockTokens);
      (authStore.getToken as jest.Mock).mockResolvedValueOnce(mockTokenInfo1).mockResolvedValueOnce(mockTokenInfo2);
      (isTokenExpired as jest.Mock)
        .mockReturnValueOnce(false) // First token not expired
        .mockReturnValueOnce(true); // Second token expired

      await expect(LoginHandler.handleWhoAmI()).rejects.toThrow('process.exit called');

      expect(consoleSpy.log).toHaveBeenCalledWith('👤 Current login sessions:\n');

      // Check first app
      expect(consoleSpy.log).toHaveBeenCalledWith('📱 App ID: test-app-id-1');
      expect(consoleSpy.log).toHaveBeenCalledWith('⌚️ AccessToken Expired: false');
      expect(consoleSpy.log).toHaveBeenCalledWith(JSON.stringify(mockTokenInfo1, null, 2));

      // Check second app
      expect(consoleSpy.log).toHaveBeenCalledWith('📱 App ID: test-app-id-2');
      expect(consoleSpy.log).toHaveBeenCalledWith('⌚️ AccessToken Expired: true');
      expect(consoleSpy.log).toHaveBeenCalledWith(JSON.stringify(mockTokenInfo2, null, 2));

      expect(authStore.getToken).toHaveBeenCalledWith('test-access-token-1');
      expect(authStore.getToken).toHaveBeenCalledWith('test-access-token-2');
      expect(isTokenExpired).toHaveBeenCalledWith(mockTokenInfo1);
      expect(isTokenExpired).toHaveBeenCalledWith(mockTokenInfo2);
      expect(mockProcessExit).toHaveBeenCalledWith(0);
    });

    it('应该处理获取token信息时的错误', async () => {
      const mockTokens = {
        'test-app-id': 'test-access-token-1',
      };

      (authStore.getAllLocalAccessTokens as jest.Mock).mockResolvedValue(mockTokens);
      (authStore.getToken as jest.Mock).mockRejectedValue(new Error('Token retrieval failed'));

      // handleWhoAmI doesn't have try-catch, so the error will bubble up
      await expect(LoginHandler.handleWhoAmI()).rejects.toThrow('Token retrieval failed');

      expect(authStore.getAllLocalAccessTokens).toHaveBeenCalled();
      expect(authStore.getToken).toHaveBeenCalledWith('test-access-token-1');
    });

    it('应该处理isTokenExpired抛出错误的情况', async () => {
      const mockTokens = {
        'test-app-id': 'test-access-token-1',
      };
      const mockTokenInfo = {
        accessToken: 'test-access-token-1',
        expiresIn: 7200,
        createdAt: Date.now(),
      };

      (authStore.getAllLocalAccessTokens as jest.Mock).mockResolvedValue(mockTokens);
      (authStore.getToken as jest.Mock).mockResolvedValue(mockTokenInfo);
      (isTokenExpired as jest.Mock).mockImplementation(() => {
        throw new Error('Token validation failed');
      });

      // handleWhoAmI doesn't have try-catch, so the error will bubble up
      await expect(LoginHandler.handleWhoAmI()).rejects.toThrow('Token validation failed');

      expect(authStore.getToken).toHaveBeenCalledWith('test-access-token-1');
      expect(isTokenExpired).toHaveBeenCalledWith(mockTokenInfo);
    });
  });

  describe('handleLogin - 额外的边界测试', () => {
    it('应该正确处理authHandler.callbackUrl属性', async () => {
      const options = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        domain: 'test.domain.com',
        host: 'localhost',
        port: '3000',
      };

      const mockCallbackUrl = 'http://localhost:3000/callback';
      const mockReAuthorize = jest.fn().mockResolvedValue({
        authorizeUrl: 'http://test-auth-url.com',
        accessToken: '',
      });

      (LarkAuthHandlerLocal as jest.MockedClass<typeof LarkAuthHandlerLocal>).mockImplementation(
        () =>
          ({
            reAuthorize: mockReAuthorize,
            callbackUrl: mockCallbackUrl,
          }) as any,
      );

      jest.spyOn(LoginHandler, 'checkTokenWithTimeout').mockResolvedValue(true);
      (authStore.removeLocalAccessToken as jest.Mock).mockResolvedValue(undefined);

      await expect(LoginHandler.handleLogin(options)).rejects.toThrow('process.exit called');

      expect(consoleSpy.log).toHaveBeenCalledWith(
        `💡 Note: Please ensure the redirect URL (${mockCallbackUrl}) is configured in your app's security settings.`,
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        `   If not configured yet, go to: ${options.domain}/app/${options.appId}/safe`,
      );
      expect(authStore.removeLocalAccessToken).toHaveBeenCalledWith(options.appId);
      expect(mockProcessExit).toHaveBeenCalledWith(0);
    });

    it('应该使用默认timeout值', async () => {
      const options = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        domain: 'test.domain.com',
        host: 'localhost',
        port: '3000',
        // 没有提供 timeout
      };

      const mockReAuthorize = jest.fn().mockResolvedValue({
        authorizeUrl: 'http://test-auth-url.com',
        accessToken: '',
      });

      (LarkAuthHandlerLocal as jest.MockedClass<typeof LarkAuthHandlerLocal>).mockImplementation(
        () =>
          ({
            reAuthorize: mockReAuthorize,
            callbackUrl: 'http://localhost:3000/callback',
          }) as any,
      );

      const checkTokenSpy = jest.spyOn(LoginHandler, 'checkTokenWithTimeout').mockResolvedValue(false);
      (authStore.removeLocalAccessToken as jest.Mock).mockResolvedValue(undefined);

      await expect(LoginHandler.handleLogin(options)).rejects.toThrow('process.exit called');

      // 验证使用了默认的60000毫秒timeout
      expect(checkTokenSpy).toHaveBeenCalledWith(60000, options.appId);
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });

    it('应该使用自定义timeout值', async () => {
      const customTimeout = 30000;
      const options = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        domain: 'test.domain.com',
        host: 'localhost',
        port: '3000',
        timeout: customTimeout,
      };

      const mockReAuthorize = jest.fn().mockResolvedValue({
        authorizeUrl: 'http://test-auth-url.com',
        accessToken: '',
      });

      (LarkAuthHandlerLocal as jest.MockedClass<typeof LarkAuthHandlerLocal>).mockImplementation(
        () =>
          ({
            reAuthorize: mockReAuthorize,
            callbackUrl: 'http://localhost:3000/callback',
          }) as any,
      );

      const checkTokenSpy = jest.spyOn(LoginHandler, 'checkTokenWithTimeout').mockResolvedValue(true);
      (authStore.removeLocalAccessToken as jest.Mock).mockResolvedValue(undefined);

      await expect(LoginHandler.handleLogin(options)).rejects.toThrow('process.exit called');

      // 验证使用了自定义timeout值
      expect(checkTokenSpy).toHaveBeenCalledWith(customTimeout, options.appId);
      expect(mockProcessExit).toHaveBeenCalledWith(0);
    });
  });
});
