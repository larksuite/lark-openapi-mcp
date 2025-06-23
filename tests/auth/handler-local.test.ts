import { LarkAuthHandlerLocal } from '../../src/auth/handler/handler-local';
import { LarkAuthHandler } from '../../src/auth/handler/handler';
import { authStore } from '../../src/auth/store';
import { generatePKCEPair } from '../../src/auth/utils/pkce';
import { isTokenValid } from '../../src/auth/utils/is-token-valid';
import { mcpAuthRouter } from '@modelcontextprotocol/sdk/server/auth/router.js';

// Mock dependencies
jest.mock('../../src/auth/store');
jest.mock('../../src/auth/utils/pkce');
jest.mock('../../src/auth/utils/is-token-valid');
jest.mock('../../src/auth/provider');
jest.mock('@modelcontextprotocol/sdk/server/auth/router.js');

const mockApp = {
  use: jest.fn(),
  get: jest.fn(),
  listen: jest.fn(),
} as any;

const mockauthStore = {
  getCodeVerifier: jest.fn(),
  removeCodeVerifier: jest.fn(),
  storeLocalAccessToken: jest.fn(),
  getLocalAccessToken: jest.fn(),
  storeCodeVerifier: jest.fn(),
  getClient: jest.fn(),
  registerClient: jest.fn(),
  getToken: jest.fn(),
  storeToken: jest.fn(),
  removeToken: jest.fn(),
};

describe('LarkAuthHandlerLocal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(authStore, mockauthStore);
    (generatePKCEPair as jest.Mock).mockReturnValue({
      codeVerifier: 'test-verifier',
      codeChallenge: 'test-challenge',
    });
    (isTokenValid as jest.Mock).mockResolvedValue({ valid: true, isExpired: false, token: {} });
    (mcpAuthRouter as jest.Mock).mockReturnValue((req: any, res: any, next: any) => next());
  });

  describe('reAuthorize method', () => {
    it('应该在本地token有效时返回现有token', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      const existingToken = 'valid-token';
      mockauthStore.getLocalAccessToken.mockResolvedValue(existingToken);
      (isTokenValid as jest.Mock).mockResolvedValue({ valid: true, isExpired: false, token: {} });

      const result = await handler.reAuthorize();

      expect(result.accessToken).toBe(existingToken);
      expect(result.authorizeUrl).toBe('');
    });

    it('应该在本地token无效时创建新的授权URL', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      mockauthStore.getLocalAccessToken.mockResolvedValue(null);
      mockauthStore.getClient.mockReturnValue(null);

      // Mock server start/stop
      const mockServer = {
        close: jest.fn((callback) => callback()),
      };
      mockApp.listen.mockImplementation((port: any, host: any, callback: any) => {
        callback();
        return mockServer;
      });

      const result = await handler.reAuthorize();

      expect(result.accessToken).toBe('');
      expect(result.authorizeUrl).toContain('http://localhost:3000/authorize');
      expect(mockauthStore.registerClient).toHaveBeenCalled();
      expect(mockauthStore.storeCodeVerifier).toHaveBeenCalled();
    });

    it('应该在传入的accessToken等于localAccessToken时重新授权', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      const existingToken = 'existing-token';
      mockauthStore.getLocalAccessToken.mockResolvedValue(existingToken);
      mockauthStore.getClient.mockReturnValue(null);
      (isTokenValid as jest.Mock).mockResolvedValue({ valid: true, isExpired: false, token: {} });

      // Mock server start/stop
      const mockServer = {
        close: jest.fn((callback) => callback()),
      };
      mockApp.listen.mockImplementation((port: any, host: any, callback: any) => {
        callback();
        return mockServer;
      });

      // Mock setTimeout
      jest.spyOn(global, 'setTimeout').mockImplementation((fn: any) => {
        return {} as any;
      });

      // 传入与localAccessToken相同的accessToken
      const result = await handler.reAuthorize(existingToken);

      expect(result.accessToken).toBe('');
      expect(result.authorizeUrl).toContain('http://localhost:3000/authorize');
      expect(mockauthStore.registerClient).toHaveBeenCalled();
      expect(mockauthStore.storeCodeVerifier).toHaveBeenCalled();

      // Restore setTimeout
      jest.restoreAllMocks();
    });
  });

  describe('callback method', () => {
    it('应该处理没有code的请求', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      const mockReq = { query: {} } as any;
      const mockRes = { send: jest.fn(), end: jest.fn() } as any;

      await handler['callback'](mockReq, mockRes);

      expect(mockRes.end).toHaveBeenCalledWith('error, failed to exchange authorization code, please try again');
    });

    it('应该处理没有code verifier的请求', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      const mockReq = { query: { code: 'test-code' } } as any;
      const mockRes = { send: jest.fn(), end: jest.fn() } as any;

      mockauthStore.getCodeVerifier.mockReturnValue(null);

      await handler['callback'](mockReq, mockRes);

      expect(mockRes.end).toHaveBeenCalledWith('error: code_verifier not found, please try again');
    });
  });

  describe('refreshToken', () => {
    it('应该成功刷新token并存储本地token', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);
      const accessToken = 'test-access-token';
      const mockNewToken = {
        access_token: 'new-access-token',
        token_type: 'Bearer',
        refresh_token: 'new-refresh-token',
        expires_in: 3600,
      };

      // Mock super.refreshToken
      const superRefreshToken = jest.spyOn(LarkAuthHandler.prototype, 'refreshToken');
      superRefreshToken.mockResolvedValue(mockNewToken);

      const result = await handler.refreshToken(accessToken);

      expect(superRefreshToken).toHaveBeenCalledWith(accessToken);
      expect(mockauthStore.storeLocalAccessToken).toHaveBeenCalledWith('new-access-token', 'test-app-id');
      expect(result).toBe(mockNewToken);

      superRefreshToken.mockRestore();
    });

    it('应该处理super.refreshToken抛出的错误', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);
      const accessToken = 'test-access-token';

      // Mock super.refreshToken to throw error
      const superRefreshToken = jest.spyOn(LarkAuthHandler.prototype, 'refreshToken');
      superRefreshToken.mockRejectedValue(new Error('Refresh failed'));

      await expect(handler.refreshToken(accessToken)).rejects.toThrow('Refresh failed');

      expect(superRefreshToken).toHaveBeenCalledWith(accessToken);
      expect(mockauthStore.storeLocalAccessToken).not.toHaveBeenCalled();

      superRefreshToken.mockRestore();
    });
  });

  describe('callback method with successful token exchange', () => {
    it('应该成功处理授权码并存储token', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      const mockReq = { query: { code: 'test-code' } } as any;
      const mockRes = { send: jest.fn(), end: jest.fn() } as any;

      mockauthStore.getCodeVerifier.mockReturnValue('test-verifier');

      // Mock provider.exchangeAuthorizationCode
      const mockToken = { access_token: 'new-access-token' };
      const mockProvider = {
        exchangeAuthorizationCode: jest.fn().mockResolvedValue(mockToken),
      };
      (handler as any).provider = mockProvider;

      // Mock setTimeout to avoid actual delay
      jest.spyOn(global, 'setTimeout').mockImplementation((fn: any) => {
        // Don't actually call the function to avoid server stop
        return {} as any;
      });

      await handler['callback'](mockReq, mockRes);

      expect(mockProvider.exchangeAuthorizationCode).toHaveBeenCalledWith(
        { client_id: 'client_id_for_local_auth', redirect_uris: [] },
        'test-code',
        'test-verifier',
        'http://localhost:3000/callback',
      );
      expect(mockauthStore.removeCodeVerifier).toHaveBeenCalledWith('client_id_for_local_auth');
      expect(mockauthStore.storeLocalAccessToken).toHaveBeenCalledWith('new-access-token', 'test-app-id');
      expect(mockRes.end).toHaveBeenCalledWith('success, you can close this page now');

      // Restore setTimeout
      jest.restoreAllMocks();
    });
  });

  describe('reAuthorize with existing client', () => {
    it('应该在客户端已存在时直接使用', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      mockauthStore.getLocalAccessToken.mockResolvedValue(null);
      mockauthStore.getClient.mockReturnValue({ client_id: 'client_id_for_local_auth' });

      // Mock server start/stop
      const mockServer = {
        close: jest.fn((callback) => callback()),
      };
      mockApp.listen.mockImplementation((port: any, host: any, callback: any) => {
        callback();
        return mockServer;
      });

      // Mock setTimeout
      jest.spyOn(global, 'setTimeout').mockImplementation((fn: any) => {
        // Don't actually call the function
        return {} as any;
      });

      const result = await handler.reAuthorize();

      expect(result.accessToken).toBe('');
      expect(result.authorizeUrl).toContain('http://localhost:3000/authorize');
      expect(mockauthStore.registerClient).toHaveBeenCalled();
      expect(mockauthStore.storeCodeVerifier).toHaveBeenCalled();

      // Restore setTimeout
      jest.restoreAllMocks();
    });
  });

  describe('reAuthorize with scope', () => {
    it('应该在有scope时包含scope参数', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        scope: ['read', 'write'],
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      mockauthStore.getLocalAccessToken.mockResolvedValue(null);
      mockauthStore.getClient.mockReturnValue(null);

      // Mock server start/stop
      const mockServer = {
        close: jest.fn((callback) => callback()),
      };
      mockApp.listen.mockImplementation((port: any, host: any, callback: any) => {
        callback();
        return mockServer;
      });

      // Mock setTimeout
      jest.spyOn(global, 'setTimeout').mockImplementation((fn: any) => {
        return {} as any;
      });

      const result = await handler.reAuthorize();

      expect(result.authorizeUrl).toContain('scope=read+write');

      // Restore setTimeout
      jest.restoreAllMocks();
    });
  });

  describe('server management', () => {
    it('应该处理服务器启动错误', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      mockauthStore.getLocalAccessToken.mockResolvedValue(null);
      mockauthStore.getClient.mockReturnValue(null);

      // Mock server start error
      mockApp.listen.mockImplementation((port: any, host: any, callback: any) => {
        callback(new Error('Server start error'));
        return null;
      });

      await expect(handler.reAuthorize()).rejects.toThrow('Server start error');
    });

    it('应该处理服务器停止错误', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      // 首先启动服务器
      const mockServer = {
        close: jest.fn((callback) => callback(new Error('Server stop error'))),
      };
      mockApp.listen.mockImplementation((port: any, host: any, callback: any) => {
        callback();
        return mockServer;
      });

      // 设置expressServer
      (handler as any).expressServer = mockServer;

      // 调用stopServer应该会抛出错误
      await expect((handler as any).stopServer()).rejects.toThrow('Server stop error');
    });

    it('应该在服务器已存在时跳过启动', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      // 设置已存在的expressServer
      (handler as any).expressServer = { close: jest.fn() };

      // 调用startServer应该直接返回
      const result = await (handler as any).startServer();
      expect(result).toBeUndefined();
    });

    it('应该在没有服务器时跳过停止', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      // 确保没有expressServer
      (handler as any).expressServer = null;

      // 调用stopServer应该直接resolve
      const result = await (handler as any).stopServer();
      expect(result).toBe(true);
    });

    it('应该在停止服务器时清理timeout并设置expressServer为null', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      // 设置timeoutId和expressServer
      const mockTimeoutId = setTimeout(() => {}, 1000);
      (handler as any).timeoutId = mockTimeoutId;

      const mockServer = {
        close: jest.fn((callback) => callback()),
      };
      (handler as any).expressServer = mockServer;

      // Mock clearTimeout
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

      // 调用stopServer
      const result = await (handler as any).stopServer();

      expect(clearTimeoutSpy).toHaveBeenCalledWith(mockTimeoutId);
      expect((handler as any).timeoutId).toBeNull();
      expect((handler as any).expressServer).toBeNull();
      expect(result).toBe(true);

      clearTimeoutSpy.mockRestore();
    });

    it('应该在callback中处理stopServer错误', async () => {
      const options = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandlerLocal(mockApp, options);

      const mockReq = { query: { code: 'test-code' } } as any;
      const mockRes = { send: jest.fn(), end: jest.fn() } as any;

      mockauthStore.getCodeVerifier.mockReturnValue('test-verifier');

      // Mock provider.exchangeAuthorizationCode
      const mockToken = { access_token: 'new-access-token' };
      const mockProvider = {
        exchangeAuthorizationCode: jest.fn().mockResolvedValue(mockToken),
      };
      (handler as any).provider = mockProvider;

      // Mock stopServer to throw error
      const stopServerSpy = jest.spyOn(handler as any, 'stopServer');
      stopServerSpy.mockRejectedValue(new Error('Stop server error'));

      // Mock console.error
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      // Mock setTimeout to actually call the function
      jest.spyOn(global, 'setTimeout').mockImplementation((fn: any) => {
        // Call the function immediately to test error handling
        fn();
        return {} as any;
      });

      await handler['callback'](mockReq, mockRes);

      // Wait for setTimeout callback to execute
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[LarkAuthHandlerLocal] callback: Error stopping server: Error: Stop server error',
      );

      // Restore mocks
      stopServerSpy.mockRestore();
      consoleErrorSpy.mockRestore();
      jest.restoreAllMocks();
    });
  });
});
