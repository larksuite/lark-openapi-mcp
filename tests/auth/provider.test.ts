import { Response } from 'express';
import { LarkOAuth2OAuthServerProvider } from '../../src/auth/provider';
import { authStore } from '../../src/auth/store';
import { isTokenValid } from '../../src/auth/utils/is-token-valid';
import { OAuthClientInformationFull, OAuthTokens } from '@modelcontextprotocol/sdk/shared/auth.js';
import { commonHttpInstance } from '../../src/utils/http-instance';

// Mock dependencies
jest.mock('../../src/auth/store');
jest.mock('../../src/auth/utils/is-token-valid');
jest.mock('../../src/utils/http-instance');

const mockedHttpInstance = commonHttpInstance as jest.Mocked<typeof commonHttpInstance>;

describe('LarkOAuth2OAuthServerProvider', () => {
  let provider: LarkOAuth2OAuthServerProvider;
  let mockResponse: Partial<Response>;
  let mockClient: OAuthClientInformationFull;

  const options = {
    domain: 'https://open.feishu.cn',
    host: 'localhost',
    port: 3000,
    appId: 'test-app-id',
    appSecret: 'test-app-secret',
    callbackUrl: 'http://localhost:3000/callback',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    provider = new LarkOAuth2OAuthServerProvider(options);

    mockResponse = {
      redirect: jest.fn(),
    };

    mockClient = {
      client_id: 'test-client-id',
      redirect_uris: ['http://example.com/callback'],
    } as OAuthClientInformationFull;

    (authStore as any) = {
      storeToken: jest.fn(),
      getTokenByRefreshToken: jest.fn(),
    };
  });

  describe('constructor', () => {
    it('应该正确初始化endpoints', () => {
      expect(provider['_endpoints']).toEqual({
        authorizationUrl: 'https://open.feishu.cn/open-apis/authen/v1/authorize',
        tokenUrl: 'https://open.feishu.cn/open-apis/authen/v2/oauth/token',
        registrationUrl: 'https://open.feishu.cn/open-apis/authen/v1/index',
        tenantAccessTokenUrl: 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
        appScopesUrl: 'https://open.feishu.cn/open-apis/application/v6/scopes',
      });
    });

    it('应该设置skipLocalPkceValidation为true', () => {
      expect(provider.skipLocalPkceValidation).toBe(true);
    });
  });

  describe('clientsStore getter', () => {
    it('应该返回clients store', () => {
      expect(provider.clientsStore).toBe(authStore);
    });
  });

  describe('authorize method', () => {
    it('应该重定向到正确的授权URL', async () => {
      const params = {
        codeChallenge: 'test-challenge',
        redirectUri: 'http://example.com/callback',
        state: 'test-state',
        scopes: ['scope1', 'scope2'],
      };

      await provider.authorize(mockClient, params, mockResponse as Response);

      expect(mockResponse.redirect).toHaveBeenCalledWith(
        expect.stringContaining('https://open.feishu.cn/open-apis/authen/v1/authorize'),
      );

      const redirectUrl = (mockResponse.redirect as jest.Mock).mock.calls[0][0];
      const url = new URL(redirectUrl);

      expect(url.searchParams.get('client_id')).toBe('test-app-id');
      expect(url.searchParams.get('response_type')).toBe('code');
      expect(url.searchParams.get('code_challenge')).toBe('test-challenge');
      expect(url.searchParams.get('code_challenge_method')).toBe('S256');
      expect(url.searchParams.get('state')).toBe('test-state');
      expect(url.searchParams.get('scope')).toBe('scope1 scope2');
      expect(mockedHttpInstance.post).not.toHaveBeenCalled();
      expect(mockedHttpInstance.get).not.toHaveBeenCalled();
    });

    it('应该处理没有state的情况', async () => {
      const params = {
        codeChallenge: 'test-challenge',
        redirectUri: 'http://example.com/callback',
        scopes: ['scope1'],
      };

      await provider.authorize(mockClient, params, mockResponse as Response);

      const redirectUrl = (mockResponse.redirect as jest.Mock).mock.calls[0][0];
      const url = new URL(redirectUrl);

      expect(url.searchParams.get('state')).toBeNull();
    });

    it('没有scopes时应该请求应用已授权的全部用户权限', async () => {
      mockedHttpInstance.post.mockResolvedValueOnce({
        data: { tenant_access_token: 'test-tenant-access-token' },
      });
      mockedHttpInstance.get.mockResolvedValueOnce({
        data: {
          code: 0,
          data: {
            scopes: [
              { grant_status: 1, scope_name: 'docx:document', scope_type: 'user' },
              { grant_status: 1, scope_name: 'offline_access', scope_type: 'user' },
              { grant_status: 1, scope_name: 'im:message:send_as_bot', scope_type: 'tenant' },
              { grant_status: 0, scope_name: 'calendar:calendar', scope_type: 'user' },
            ],
          },
        },
      });

      const params = {
        codeChallenge: 'test-challenge',
        redirectUri: 'http://example.com/callback',
      };

      await provider.authorize(mockClient, params, mockResponse as Response);

      const redirectUrl = (mockResponse.redirect as jest.Mock).mock.calls[0][0];
      const url = new URL(redirectUrl);

      expect(mockedHttpInstance.post).toHaveBeenCalledWith(
        'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
        { app_id: 'test-app-id', app_secret: 'test-app-secret' },
        { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
      );
      expect(mockedHttpInstance.get).toHaveBeenCalledWith(
        'https://open.feishu.cn/open-apis/application/v6/scopes',
        { headers: { Authorization: 'Bearer test-tenant-access-token' } },
      );
      expect(url.searchParams.get('scope')).toBe('docx:document offline_access');
    });

    it('没有已授权用户权限时应该拒绝生成最小权限授权URL', async () => {
      mockedHttpInstance.post.mockResolvedValueOnce({
        data: { tenant_access_token: 'test-tenant-access-token' },
      });
      mockedHttpInstance.get.mockResolvedValueOnce({
        data: {
          code: 0,
          data: {
            scopes: [{ grant_status: 1, scope_name: 'im:message:send_as_bot', scope_type: 'tenant' }],
          },
        },
      });

      await expect(
        provider.authorize(
          mockClient,
          { codeChallenge: 'test-challenge', redirectUri: 'http://example.com/callback' },
          mockResponse as Response,
        ),
      ).rejects.toThrow('Failed to load default user scopes: no granted user scopes found for the app');
      expect(mockResponse.redirect).not.toHaveBeenCalled();
    });
  });

  describe('challengeForAuthorizationCode method', () => {
    it('应该返回空字符串', async () => {
      const result = await provider.challengeForAuthorizationCode(mockClient, 'test-code');
      expect(result).toBe('');
    });
  });

  describe('exchangeAuthorizationCode method', () => {
    it('应该成功交换授权码获取token', async () => {
      const mockTokenResponse = {
        access_token: 'test-access-token',
        refresh_token: 'test-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'scope1 scope2',
      };

      mockedHttpInstance.post.mockResolvedValueOnce({
        data: mockTokenResponse,
      });

      const result = await provider.exchangeAuthorizationCode(
        mockClient,
        'test-auth-code',
        'test-verifier',
        'http://example.com/callback',
      );

      expect(mockedHttpInstance.post).toHaveBeenCalledWith(
        'https://open.feishu.cn/open-apis/authen/v2/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: 'test-app-id',
          client_secret: 'test-app-secret',
          code: 'test-auth-code',
          redirect_uri: 'http://localhost:3000/callback?redirect_uri=http://example.com/callback',
          code_verifier: 'test-verifier',
        },
        {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        },
      );

      expect(authStore.storeToken).toHaveBeenCalledWith({
        clientId: 'test-client-id',
        token: 'test-access-token',
        scopes: ['scope1', 'scope2'],
        expiresAt: expect.any(Number),
        extra: {
          refreshToken: 'test-refresh-token',
          token: mockTokenResponse,
          appId: 'test-app-id',
          appSecret: 'test-app-secret',
        },
      });

      expect(result).toEqual(mockTokenResponse);
    });

    it('应该处理没有expires_in的token响应', async () => {
      const mockTokenResponse = {
        access_token: 'test-access-token',
        refresh_token: 'test-refresh-token',
        token_type: 'Bearer',
        scope: 'scope1 scope2',
      };

      mockedHttpInstance.post.mockResolvedValueOnce({
        data: mockTokenResponse,
      });

      const result = await provider.exchangeAuthorizationCode(
        mockClient,
        'test-auth-code',
        'test-verifier',
        'http://example.com/callback',
      );

      expect(authStore.storeToken).toHaveBeenCalledWith({
        clientId: 'test-client-id',
        token: 'test-access-token',
        scopes: ['scope1', 'scope2'],
        expiresAt: undefined,
        extra: {
          refreshToken: 'test-refresh-token',
          token: mockTokenResponse,
          appId: 'test-app-id',
          appSecret: 'test-app-secret',
        },
      });

      expect(result).toEqual(mockTokenResponse);
    });

    it('应该处理没有scope的token响应', async () => {
      const mockTokenResponse = {
        access_token: 'test-access-token',
        refresh_token: 'test-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
      };

      mockedHttpInstance.post.mockResolvedValueOnce({
        data: mockTokenResponse,
      });

      const result = await provider.exchangeAuthorizationCode(
        mockClient,
        'test-auth-code',
        'test-verifier',
        'http://example.com/callback',
      );

      expect(authStore.storeToken).toHaveBeenCalledWith({
        clientId: 'test-client-id',
        token: 'test-access-token',
        scopes: [],
        expiresAt: expect.any(Number),
        extra: {
          refreshToken: 'test-refresh-token',
          token: mockTokenResponse,
          appId: 'test-app-id',
          appSecret: 'test-app-secret',
        },
      });

      expect(result).toEqual(mockTokenResponse);
    });

    it('应该在token交换失败时抛出错误', async () => {
      const mockError = {
        response: {
          status: 400,
          data: 'Bad Request',
        },
      };

      mockedHttpInstance.post.mockRejectedValueOnce(mockError);

      await expect(provider.exchangeAuthorizationCode(mockClient, 'invalid-code')).rejects.toThrow(
        'Token exchange failed: 400 Bad Request',
      );
    });
  });

  describe('exchangeRefreshToken method', () => {
    it('应该成功刷新token', async () => {
      const mockOriginalToken = {
        token: 'original-token',
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        expiresAt: Date.now() / 1000 + 3600,
        extra: {
          refreshToken: 'test-refresh-token',
          appId: 'stored-app-id',
          appSecret: 'stored-app-secret',
        },
      };

      (authStore.getTokenByRefreshToken as jest.Mock).mockResolvedValue(mockOriginalToken);

      const mockTokenResponse = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'scope1 scope2',
      };

      mockedHttpInstance.post.mockResolvedValueOnce({
        data: mockTokenResponse,
      });

      const result = await provider.exchangeRefreshToken(mockClient, 'test-refresh-token', ['scope1', 'scope2']);

      expect(mockedHttpInstance.post).toHaveBeenCalledWith(
        'https://open.feishu.cn/open-apis/authen/v2/oauth/token',
        {
          grant_type: 'refresh_token',
          client_id: 'stored-app-id',
          client_secret: 'stored-app-secret',
          refresh_token: 'test-refresh-token',
          scope: 'scope1 scope2',
        },
        {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        },
      );

      expect(result).toEqual(mockTokenResponse);
    });

    it('应该处理没有scopes的情况', async () => {
      const mockOriginalToken = {
        token: 'original-token',
        clientId: 'test-client-id',
        scopes: [],
        expiresAt: Date.now() / 1000 + 3600,
        extra: {
          refreshToken: 'test-refresh-token',
          appId: 'test-app-id',
          appSecret: 'test-app-secret',
        },
      };

      (authStore.getTokenByRefreshToken as jest.Mock).mockResolvedValue(mockOriginalToken);

      const mockTokenResponse = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
      };

      mockedHttpInstance.post.mockResolvedValueOnce({
        data: mockTokenResponse,
      });

      const result = await provider.exchangeRefreshToken(mockClient, 'test-refresh-token');

      expect(mockedHttpInstance.post).toHaveBeenCalledWith(
        'https://open.feishu.cn/open-apis/authen/v2/oauth/token',
        {
          grant_type: 'refresh_token',
          client_id: 'test-app-id',
          client_secret: 'test-app-secret',
          refresh_token: 'test-refresh-token',
        },
        {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        },
      );

      expect(result).toEqual(mockTokenResponse);
    });

    it('应该处理没有expires_in的刷新token响应', async () => {
      const mockOriginalToken = {
        token: 'original-token',
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        expiresAt: Date.now() / 1000 + 3600,
        extra: {
          refreshToken: 'test-refresh-token',
          appId: 'test-app-id',
          appSecret: 'test-app-secret',
        },
      };

      (authStore.getTokenByRefreshToken as jest.Mock).mockResolvedValue(mockOriginalToken);

      const mockTokenResponse = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        token_type: 'Bearer',
      };

      mockedHttpInstance.post.mockResolvedValueOnce({
        data: mockTokenResponse,
      });

      const result = await provider.exchangeRefreshToken(mockClient, 'test-refresh-token', ['scope1', 'scope2']);

      expect(authStore.storeToken).toHaveBeenCalledWith({
        clientId: 'test-client-id',
        token: 'new-access-token',
        scopes: [],
        expiresAt: undefined,
        extra: {
          refreshToken: 'new-refresh-token',
          token: mockTokenResponse,
          appId: 'test-app-id',
          appSecret: 'test-app-secret',
        },
      });

      expect(result).toEqual(mockTokenResponse);
    });

    it('应该处理没有scope的刷新token响应', async () => {
      const mockOriginalToken = {
        token: 'original-token',
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        expiresAt: Date.now() / 1000 + 3600,
        extra: {
          refreshToken: 'test-refresh-token',
          appId: 'test-app-id',
          appSecret: 'test-app-secret',
        },
      };

      (authStore.getTokenByRefreshToken as jest.Mock).mockResolvedValue(mockOriginalToken);

      const mockTokenResponse = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
      };

      mockedHttpInstance.post.mockResolvedValueOnce({
        data: mockTokenResponse,
      });

      const result = await provider.exchangeRefreshToken(mockClient, 'test-refresh-token', ['scope1', 'scope2']);

      expect(authStore.storeToken).toHaveBeenCalledWith({
        clientId: 'test-client-id',
        token: 'new-access-token',
        scopes: [],
        expiresAt: expect.any(Number),
        extra: {
          refreshToken: 'new-refresh-token',
          token: mockTokenResponse,
          appId: 'test-app-id',
          appSecret: 'test-app-secret',
        },
      });

      expect(result).toEqual(mockTokenResponse);
    });

    it('应该在token刷新失败时抛出错误', async () => {
      const mockOriginalToken = {
        token: 'original-token',
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        expiresAt: Date.now() / 1000 + 3600,
        extra: {
          refreshToken: 'test-refresh-token',
          appId: 'test-app-id',
          appSecret: 'test-app-secret',
        },
      };

      (authStore.getTokenByRefreshToken as jest.Mock).mockResolvedValue(mockOriginalToken);

      const mockError = {
        response: {
          status: 401,
          data: 'Unauthorized',
        },
      };

      mockedHttpInstance.post.mockRejectedValueOnce(mockError);

      await expect(provider.exchangeRefreshToken(mockClient, 'invalid-refresh-token')).rejects.toThrow(
        'Token refresh failed: 401 Unauthorized',
      );
    });
  });

  describe('exchangeRefreshToken with scopes', () => {
    it('应该在有scopes时包含scope参数', async () => {
      const mockOriginalToken = {
        token: 'original-token',
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        expiresAt: Date.now() / 1000 + 3600,
        extra: {
          refreshToken: 'test-refresh-token',
          appId: 'test-app-id',
          appSecret: 'test-app-secret',
        },
      };

      (authStore.getTokenByRefreshToken as jest.Mock).mockResolvedValue(mockOriginalToken);

      const mockTokenResponse = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'scope1 scope2',
      };

      mockedHttpInstance.post.mockResolvedValueOnce({
        data: mockTokenResponse,
      });

      await provider.exchangeRefreshToken(mockClient, 'test-refresh-token', ['scope1', 'scope2']);

      expect(mockedHttpInstance.post).toHaveBeenCalledWith(
        'https://open.feishu.cn/open-apis/authen/v2/oauth/token',
        {
          grant_type: 'refresh_token',
          client_id: 'test-app-id',
          client_secret: 'test-app-secret',
          refresh_token: 'test-refresh-token',
          scope: 'scope1 scope2',
        },
        {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        },
      );
    });
  });

  describe('verifyAccessToken method', () => {
    it('应该返回有效token的信息', async () => {
      const mockToken = {
        token: 'test-token',
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        expiresAt: Date.now() / 1000 + 3600,
        extra: { refreshToken: 'test-refresh-token' },
      };

      (isTokenValid as jest.Mock).mockResolvedValue({ valid: true, token: mockToken });

      const result = await provider.verifyAccessToken('test-token');

      expect(result).toEqual(mockToken);
    });

    it('应该处理无效token', async () => {
      const mockToken = {
        token: 'test-token',
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        expiresAt: 1,
        extra: { refreshToken: 'test-refresh-token' },
      };

      (isTokenValid as jest.Mock).mockResolvedValue({ valid: false, token: mockToken });

      const result = await provider.verifyAccessToken('invalid-token');

      expect(result).toEqual(mockToken);
    });
  });
});
