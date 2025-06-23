import { Express, Request, Response, NextFunction } from 'express';
import { LarkAuthHandler, LarkOAuthClientConfig } from '../../src/auth/handler/handler';
import { LarkOAuth2OAuthServerProvider } from '../../src/auth/provider';
import { authStore } from '../../src/auth/store';
import { generatePKCEPair } from '../../src/auth/utils/pkce';

// Mock dependencies
jest.mock('../../src/auth/provider');
jest.mock('../../src/auth/store');
jest.mock('../../src/auth/utils/pkce');
jest.mock('@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js');
jest.mock('@modelcontextprotocol/sdk/server/auth/router.js');

const mockApp = {
  use: jest.fn(),
  get: jest.fn(),
} as unknown as Express;

const mockProvider = {
  exchangeAuthorizationCode: jest.fn(),
  exchangeRefreshToken: jest.fn(),
  verifyAccessToken: jest.fn(),
  authorize: jest.fn(),
  challengeForAuthorizationCode: jest.fn(),
} as any;

const mockauthStore = {
  getToken: jest.fn(),
  storeToken: jest.fn(),
  removeToken: jest.fn(),
  getCodeVerifier: jest.fn(),
  storeCodeVerifier: jest.fn(),
  removeCodeVerifier: jest.fn(),
  getClient: jest.fn(),
  registerClient: jest.fn(),
  getLocalAccessToken: jest.fn(),
  storeLocalAccessToken: jest.fn(),
};

const mockClientsStore = {};

describe('LarkAuthHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (LarkOAuth2OAuthServerProvider as jest.Mock).mockImplementation(() => mockProvider);
    Object.assign(authStore, mockauthStore);
    (generatePKCEPair as jest.Mock).mockReturnValue({
      codeVerifier: 'test-verifier',
      codeChallenge: 'test-challenge',
    });

    // Mock the middleware and router modules
    const mockRequireBearerAuth = require('@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js');
    mockRequireBearerAuth.requireBearerAuth = jest.fn().mockReturnValue(jest.fn());

    const mockMcpAuthRouter = require('@modelcontextprotocol/sdk/server/auth/router.js');
    mockMcpAuthRouter.mcpAuthRouter = jest.fn().mockReturnValue(jest.fn());
  });

  describe('constructor', () => {
    it('应该成功创建带有有效配置的实例', () => {
      const options: Partial<LarkOAuthClientConfig> = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandler(mockApp, options);

      expect(handler).toBeInstanceOf(LarkAuthHandler);
    });

    it('应该在缺少必需参数时抛出错误', () => {
      const options: Partial<LarkOAuthClientConfig> = {
        port: 3000,
        host: 'localhost',
        // 缺少domain, appId, appSecret
      };

      expect(() => new LarkAuthHandler(mockApp, options)).toThrow(
        '[Lark MCP] Port, host, domain, appId, and appSecret are required',
      );
    });
  });

  describe('callbackUrl getter', () => {
    it('应该返回正确格式的回调URL', () => {
      const options: Partial<LarkOAuthClientConfig> = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      const handler = new LarkAuthHandler(mockApp, options);
      // Replace the real provider with mock
      (handler as any).provider = mockProvider;

      expect(handler.callbackUrl).toBe('http://localhost:3000/callback');
    });
  });

  describe('callback method', () => {
    let handler: LarkAuthHandler;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
      const options: Partial<LarkOAuthClientConfig> = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      handler = new LarkAuthHandler(mockApp, options);
      // Replace the real provider with mock
      (handler as any).provider = mockProvider;

      mockReq = {
        query: {},
      };

      mockRes = {
        redirect: jest.fn(),
        send: jest.fn(),
        end: jest.fn(),
      };
    });

    it('应该处理普通的回调请求', async () => {
      mockReq.query = {
        redirect_uri: 'http://example.com/redirect',
        code: 'test-code',
        state: 'test-state',
      };

      await handler['callback'](mockReq as Request, mockRes as Response);

      expect(mockRes.redirect).toHaveBeenCalledWith('http://example.com/redirect?code=test-code&state=test-state');
    });

    it('应该处理重新授权回调', async () => {
      mockReq.query = {
        redirect_uri: 'http://example.com/redirect',
        code: 'test-code',
        state: 'reauthorize',
      };

      mockauthStore.getCodeVerifier.mockReturnValue('test-verifier');

      await handler['callback'](mockReq as Request, mockRes as Response);

      expect(mockProvider.exchangeAuthorizationCode).toHaveBeenCalledWith(
        { client_id: 'LOCAL', redirect_uris: [] },
        'test-code',
        'test-verifier',
        'http://localhost:3000/callback',
      );
      expect(mockauthStore.removeCodeVerifier).toHaveBeenCalledWith('reauthorize');
      expect(mockRes.end).toHaveBeenCalledWith('success, you can close this page now');
    });

    it('应该处理重新授权时缺少代码的情况', async () => {
      mockReq.query = {
        redirect_uri: 'http://example.com/redirect',
        state: 'reauthorize',
        // 缺少code
      };

      await handler['callback'](mockReq as Request, mockRes as Response);

      expect(mockRes.end).toHaveBeenCalledWith('error, failed to exchange authorization code, please try again');
    });

    it('应该处理重新授权时code不是字符串类型的情况', async () => {
      mockReq.query = {
        redirect_uri: 'http://example.com/redirect',
        code: ['not-a-string'], // code是数组而不是字符串
        state: 'reauthorize',
      };

      await handler['callback'](mockReq as Request, mockRes as Response);

      expect(mockRes.end).toHaveBeenCalledWith('error, failed to exchange authorization code, please try again');
    });

    it('应该处理重新授权时缺少code verifier的情况', async () => {
      mockReq.query = {
        redirect_uri: 'http://example.com/redirect',
        code: 'test-code',
        state: 'reauthorize',
      };

      mockauthStore.getCodeVerifier.mockReturnValue(null);

      await handler['callback'](mockReq as Request, mockRes as Response);

      expect(mockRes.end).toHaveBeenCalledWith('error: code_verifier not found, please try again');
    });

    it('应该处理exchangeAuthorizationCode错误', async () => {
      mockReq.query = {
        redirect_uri: 'http://example.com/redirect',
        code: 'test-code',
        state: 'reauthorize',
      };

      mockauthStore.getCodeVerifier.mockReturnValue('test-verifier');
      mockProvider.exchangeAuthorizationCode.mockRejectedValue(new Error('Exchange failed'));

      // The callback method doesn't catch the error, so it will throw
      await expect(handler['callback'](mockReq as Request, mockRes as Response)).rejects.toThrow('Exchange failed');

      expect(mockProvider.exchangeAuthorizationCode).toHaveBeenCalledWith(
        { client_id: 'LOCAL', redirect_uris: [] },
        'test-code',
        'test-verifier',
        'http://localhost:3000/callback',
      );
      // The redirect should still happen before the error
      expect(mockRes.redirect).toHaveBeenCalledWith('http://example.com/redirect?code=test-code&state=reauthorize');
    });
  });

  describe('refreshToken method', () => {
    let handler: LarkAuthHandler;

    beforeEach(() => {
      const options: Partial<LarkOAuthClientConfig> = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      handler = new LarkAuthHandler(mockApp, options);
      // Replace the real provider with mock
      (handler as any).provider = mockProvider;
    });

    it('应该成功刷新token', async () => {
      const accessToken = 'test-access-token';
      const mockToken = {
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        extra: { refreshToken: 'test-refresh-token' },
      };

      const mockNewToken = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        expires_in: 3600,
      };

      mockauthStore.getToken.mockResolvedValue(mockToken);
      mockProvider.exchangeRefreshToken.mockResolvedValue(mockNewToken);

      const result = await handler.refreshToken(accessToken);

      expect(mockauthStore.getToken).toHaveBeenCalledWith(accessToken);
      expect(mockProvider.exchangeRefreshToken).toHaveBeenCalledWith(
        {
          client_id: 'test-client-id',
          redirect_uris: ['http://localhost:3000/callback'],
        },
        'test-refresh-token',
        ['scope1', 'scope2'],
      );
      expect(mockauthStore.removeToken).toHaveBeenCalledWith(accessToken);
      expect(result).toBe(mockNewToken);
    });

    it('应该在没有找到本地token时抛出错误', async () => {
      mockauthStore.getToken.mockResolvedValue(null);

      await expect(handler.refreshToken('invalid-token')).rejects.toThrow('No local access token found');
    });

    it('应该在没有refresh token时抛出错误', async () => {
      const mockToken = {
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        extra: {}, // 没有refresh_token
      };

      mockauthStore.getToken.mockResolvedValue(mockToken);

      await expect(handler.refreshToken('test-token')).rejects.toThrow('No refresh token found');
    });

    it('应该处理没有expires_in的新token', async () => {
      const accessToken = 'test-access-token';
      const mockToken = {
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        extra: { refreshToken: 'test-refresh-token' },
      };

      const mockNewToken = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        // 没有expires_in字段
      };

      mockauthStore.getToken.mockResolvedValue(mockToken);
      mockProvider.exchangeRefreshToken.mockResolvedValue(mockNewToken);

      const result = await handler.refreshToken(accessToken);

      expect(mockauthStore.removeToken).toHaveBeenCalledWith(accessToken);
      expect(result).toBe(mockNewToken);
    });

    it('应该在token.extra为null时抛出错误', async () => {
      const mockToken = {
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        extra: null, // extra是null
      };

      mockauthStore.getToken.mockResolvedValue(mockToken);

      await expect(handler.refreshToken('test-token')).rejects.toThrow('No refresh token found');
    });

    it('应该处理newToken.expires_in为null的情况', async () => {
      const accessToken = 'test-access-token';
      const mockToken = {
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        extra: { refreshToken: 'test-refresh-token' },
      };

      const mockNewToken = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        expires_in: null, // expires_in明确为null
      };

      mockauthStore.getToken.mockResolvedValue(mockToken);
      mockProvider.exchangeRefreshToken.mockResolvedValue(mockNewToken);

      const result = await handler.refreshToken(accessToken);

      expect(mockauthStore.removeToken).toHaveBeenCalledWith(accessToken);
      expect(result).toBe(mockNewToken);
    });

    it('应该处理newToken.expires_in为undefined的情况', async () => {
      const accessToken = 'test-access-token';
      const mockToken = {
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        extra: { refreshToken: 'test-refresh-token' },
      };

      const mockNewToken = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        expires_in: undefined, // expires_in明确为undefined
      };

      mockauthStore.getToken.mockResolvedValue(mockToken);
      mockProvider.exchangeRefreshToken.mockResolvedValue(mockNewToken);

      const result = await handler.refreshToken(accessToken);

      expect(mockauthStore.removeToken).toHaveBeenCalledWith(accessToken);
      expect(result).toBe(mockNewToken);
    });
  });

  describe('reAuthorize method', () => {
    let handler: LarkAuthHandler;

    beforeEach(() => {
      const options: Partial<LarkOAuthClientConfig> = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        scope: ['test-scope'],
      };

      handler = new LarkAuthHandler(mockApp, options);
      // Replace the real provider with mock
      (handler as any).provider = mockProvider;
    });

    it('应该成功生成重新授权URL', async () => {
      const accessToken = 'test-access-token';
      const mockToken = {
        clientId: 'test-client-id',
      };

      mockauthStore.getToken.mockResolvedValue(mockToken);

      const result = await handler.reAuthorize(accessToken);

      expect(mockauthStore.getToken).toHaveBeenCalledWith(accessToken);
      expect(generatePKCEPair).toHaveBeenCalled();
      expect(mockauthStore.storeCodeVerifier).toHaveBeenCalledWith('reauthorize', 'test-verifier');
      expect(result.accessToken).toBe('');
      expect(result.authorizeUrl).toContain('http://localhost:3000/authorize');
      expect(result.authorizeUrl).toContain('client_id=test-client-id');
      expect(result.authorizeUrl).toContain('scope=test-scope');
    });

    it('应该在没有access token时抛出错误', async () => {
      await expect(handler.reAuthorize()).rejects.toThrow('Invalid access token, please reconnect the mcp server');
    });

    it('应该在找不到token时抛出错误', async () => {
      mockauthStore.getToken.mockResolvedValue(null);

      await expect(handler.reAuthorize('invalid-token')).rejects.toThrow(
        'Invalid access token, please reconnect the mcp server',
      );
    });

    it('应该在没有scope时不包含scope参数', async () => {
      const options: Partial<LarkOAuthClientConfig> = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        // 没有scope
      };

      const handlerWithoutScope = new LarkAuthHandler(mockApp, options);
      // Replace the real provider with mock
      (handlerWithoutScope as any).provider = mockProvider;

      const mockToken = {
        clientId: 'test-client-id',
        scopes: ['read', 'write'],
        expiresAt: Date.now() / 1000 + 3600,
        extra: { refresh_token: 'refresh-token' },
      };

      mockauthStore.getToken.mockResolvedValue(mockToken);

      const result = await handlerWithoutScope.reAuthorize('test-token');

      expect(result.authorizeUrl).not.toContain('scope=');
    });
  });

  describe('authenticateRequest method', () => {
    let handler: LarkAuthHandler;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
      const options: Partial<LarkOAuthClientConfig> = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      handler = new LarkAuthHandler(mockApp, options);
      // Replace the real provider with mock
      (handler as any).provider = mockProvider;

      mockReq = {};
      mockRes = {};
      mockNext = jest.fn();
    });

    it('应该调用requireBearerAuth中间件', () => {
      // Mock requireBearerAuth
      const mockRequireBearerAuth = require('@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js');
      const mockMiddleware = jest.fn();
      mockRequireBearerAuth.requireBearerAuth.mockReturnValue(mockMiddleware);

      handler.authenticateRequest(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRequireBearerAuth.requireBearerAuth).toHaveBeenCalledWith({
        verifier: expect.any(Object),
        requiredScopes: [],
      });
      expect(mockMiddleware).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    });
  });

  describe('setupRoutes method', () => {
    it('应该设置必要的路由', () => {
      const options: Partial<LarkOAuthClientConfig> = {
        port: 3000,
        host: 'localhost',
        domain: 'test.domain.com',
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      };

      // Mock mcpAuthRouter
      const mockMcpAuthRouter = require('@modelcontextprotocol/sdk/server/auth/router.js');
      const mockRouter = jest.fn();
      mockMcpAuthRouter.mcpAuthRouter.mockReturnValue(mockRouter);

      // 创建handler时会自动调用setupRoutes
      const handler = new LarkAuthHandler(mockApp, options);
      // Replace the real provider with mock
      (handler as any).provider = mockProvider;

      expect(mockMcpAuthRouter.mcpAuthRouter).toHaveBeenCalledWith({
        provider: expect.any(Object),
        issuerUrl: expect.any(URL),
      });
      expect(mockApp.use).toHaveBeenCalledWith(mockRouter);
      expect(mockApp.get).toHaveBeenCalledWith('/callback', expect.any(Function));

      // 直接调用setupRoutes确保覆盖率
      jest.clearAllMocks();
      handler.setupRoutes();

      expect(mockMcpAuthRouter.mcpAuthRouter).toHaveBeenCalledTimes(1);
      expect(mockApp.use).toHaveBeenCalledTimes(1);
      expect(mockApp.get).toHaveBeenCalledTimes(1);

      // 获取并调用回调函数以覆盖anonymous_3
      const callbackFunction = (mockApp.get as jest.Mock).mock.calls[0][1];
      const mockReq = { query: { redirect_uri: 'http://test.com', code: 'test', state: 'test' } };
      const mockRes = { redirect: jest.fn() };

      // 调用回调函数
      callbackFunction(mockReq, mockRes);
      expect(mockRes.redirect).toHaveBeenCalled();
    });
  });
});
