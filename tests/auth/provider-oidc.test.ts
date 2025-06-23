import { Response } from 'express';
import { LarkOIDC2OAuthServerProvider } from '../../src/auth/provider/oidc';
import { authStore } from '../../src/auth/store';
import { isTokenValid } from '../../src/auth/utils/is-token-valid';
import { generateCodeChallenge } from '../../src/auth/utils/pkce';
import { OAuthClientInformationFull, OAuthTokens } from '@modelcontextprotocol/sdk/shared/auth.js';
import { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import { commonHttpInstance } from '../../src/utils/http-instance';

// Mock dependencies
jest.mock('../../src/auth/store');
jest.mock('../../src/auth/utils/is-token-valid');
jest.mock('../../src/auth/utils/pkce');
jest.mock('../../src/utils/http-instance');

const mockedHttpInstance = commonHttpInstance as jest.Mocked<typeof commonHttpInstance>;

describe('LarkOIDC2OAuthServerProvider', () => {
  let provider: LarkOIDC2OAuthServerProvider;
  let mockResponse: Partial<Response>;
  let mockClient: OAuthClientInformationFull;
  let mockAuthStore: any;

  const options = {
    domain: 'https://open.feishu.cn',
    host: 'localhost',
    port: 3000,
    appId: 'test-app-id',
    appSecret: 'test-app-secret',
    callbackUrl: 'http://localhost:3000/callback',
  };

  const mockAppAccessTokenResponse = {
    app_access_token: 'test-app-access-token',
  };

  const mockTokenResponse = {
    code: 0,
    msg: 'success',
    data: {
      access_token: 'test-access-token',
      refresh_token: 'test-refresh-token',
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_expires_in: 7200,
      scope: 'scope1 scope2',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    provider = new LarkOIDC2OAuthServerProvider(options);

    mockResponse = {
      redirect: jest.fn(),
    };

    mockClient = {
      client_id: 'test-client-id',
      redirect_uris: ['http://example.com/callback'],
    } as OAuthClientInformationFull;

    mockAuthStore = {
      storeToken: jest.fn(),
      storeCodeVerifier: jest.fn(),
      getCodeVerifier: jest.fn(),
      removeCodeVerifier: jest.fn(),
      getTokenByRefreshToken: jest.fn(),
    };

    (authStore as any) = mockAuthStore;
    (generateCodeChallenge as jest.Mock).mockReturnValue('test-challenge');
  });

  describe('Provider Initialization', () => {
    it('should initialize with correct configuration', () => {
      expect(provider['_endpoints']).toEqual({
        appAccessTokenUrl: 'https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal',
        authorizationUrl: 'https://open.feishu.cn/open-apis/authen/v1/index',
        tokenUrl: 'https://open.feishu.cn/open-apis/authen/v1/oidc/access_token',
        refreshTokenUrl: 'https://open.feishu.cn/open-apis/authen/v1/oidc/refresh_access_token',
        registrationUrl: 'https://open.feishu.cn/open-apis/authen/v1/index',
      });

      expect(provider.skipLocalPkceValidation).toBe(true);
      expect(provider['_options']).toEqual(options);
      expect(provider.clientsStore).toBe(authStore);
    });
  });

  describe('Authorization Flow', () => {
    it('should handle complete authorization flow with code challenge', async () => {
      const params = {
        codeChallenge: 'test-challenge',
        redirectUri: 'http://example.com/callback',
        state: 'test-state',
        scopes: ['scope1', 'scope2'],
      };

      // Test authorize method
      await provider.authorize(mockClient, params, mockResponse as Response);

      expect(mockResponse.redirect).toHaveBeenCalledWith(
        expect.stringContaining('https://open.feishu.cn/open-apis/authen/v1/index'),
      );

      const redirectUrl = (mockResponse.redirect as jest.Mock).mock.calls[0][0];
      const url = new URL(redirectUrl);

      expect(url.searchParams.get('app_id')).toBe('test-app-id');
      expect(url.searchParams.get('redirect_uri')).toBe(
        'http://localhost:3000/callback?redirect_uri=http://example.com/callback',
      );
      expect(url.searchParams.get('state')).toBe('test-state');
      expect(mockAuthStore.storeCodeVerifier).toHaveBeenCalledWith('challenge_test-client-id', 'test-challenge');
    });

    it('should handle authorization without state and code challenge', async () => {
      const params = {
        codeChallenge: '',
        redirectUri: 'http://example.com/callback',
      };

      await provider.authorize(mockClient, params, mockResponse as Response);

      const redirectUrl = (mockResponse.redirect as jest.Mock).mock.calls[0][0];
      const url = new URL(redirectUrl);

      expect(url.searchParams.get('state')).toBeNull();
      expect(mockAuthStore.storeCodeVerifier).not.toHaveBeenCalled();
    });

    it('should return empty challenge for authorization code', async () => {
      const result = await provider.challengeForAuthorizationCode(mockClient, 'test-code');
      expect(result).toBe('');
    });
  });

  describe('Token Exchange', () => {
    it('should successfully exchange authorization code for tokens', async () => {
      mockedHttpInstance.post.mockResolvedValueOnce({
        data: mockAppAccessTokenResponse,
      });

      mockedHttpInstance.post.mockResolvedValueOnce({
        data: mockTokenResponse,
      });

      const result = await provider.exchangeAuthorizationCode(
        mockClient,
        'test-auth-code',
        undefined,
        'http://example.com/callback',
      );

      // Verify app access token request
      expect(mockedHttpInstance.post).toHaveBeenNthCalledWith(
        1,
        'https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal',
        { app_id: 'test-app-id', app_secret: 'test-app-secret' },
        { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
      );

      // Verify token exchange request
      expect(mockedHttpInstance.post).toHaveBeenNthCalledWith(
        2,
        'https://open.feishu.cn/open-apis/authen/v1/oidc/access_token',
        { grant_type: 'authorization_code', code: 'test-auth-code' },
        {
          headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: 'Bearer test-app-access-token' },
        },
      );

      expect(result).toEqual({
        access_token: 'test-access-token',
        refresh_token: 'test-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'scope1 scope2',
      });

      expect(mockAuthStore.storeToken).toHaveBeenCalled();
    });

    it('should successfully exchange authorization code with PKCE verification', async () => {
      const codeVerifier = 'test-code-verifier';
      const storedChallenge = 'test-challenge';

      mockAuthStore.getCodeVerifier.mockReturnValue(storedChallenge);
      (generateCodeChallenge as jest.Mock).mockReturnValue(storedChallenge);

      mockedHttpInstance.post.mockResolvedValueOnce({
        data: mockAppAccessTokenResponse,
      });

      mockedHttpInstance.post.mockResolvedValueOnce({
        data: mockTokenResponse,
      });

      const result = await provider.exchangeAuthorizationCode(
        mockClient,
        'test-auth-code',
        codeVerifier,
        'http://example.com/callback',
      );

      // Verify PKCE validation
      expect(mockAuthStore.getCodeVerifier).toHaveBeenCalledWith('challenge_test-client-id');
      expect(generateCodeChallenge).toHaveBeenCalledWith(codeVerifier);
      expect(mockAuthStore.removeCodeVerifier).toHaveBeenCalledWith('challenge_test-client-id');

      // Verify token exchange still works
      expect(result).toEqual({
        access_token: 'test-access-token',
        refresh_token: 'test-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'scope1 scope2',
      });

      expect(mockAuthStore.storeToken).toHaveBeenCalled();
    });

    it('should throw error when PKCE challenge is not found', async () => {
      const codeVerifier = 'test-code-verifier';

      mockAuthStore.getCodeVerifier.mockReturnValue(null);

      await expect(
        provider.exchangeAuthorizationCode(mockClient, 'test-auth-code', codeVerifier, 'http://example.com/callback'),
      ).rejects.toThrow('PKCE validation failed: code challenge not found');

      expect(mockAuthStore.getCodeVerifier).toHaveBeenCalledWith('challenge_test-client-id');
      expect(mockAuthStore.removeCodeVerifier).not.toHaveBeenCalled();
      expect(mockedHttpInstance.post).not.toHaveBeenCalled();
    });

    it('should throw error when PKCE code verifier does not match challenge', async () => {
      const codeVerifier = 'test-code-verifier';
      const storedChallenge = 'stored-challenge';
      const generatedChallenge = 'different-challenge';

      mockAuthStore.getCodeVerifier.mockReturnValue(storedChallenge);
      (generateCodeChallenge as jest.Mock).mockReturnValue(generatedChallenge);

      await expect(
        provider.exchangeAuthorizationCode(mockClient, 'test-auth-code', codeVerifier, 'http://example.com/callback'),
      ).rejects.toThrow('PKCE validation failed: code verifier does not match challenge');

      expect(mockAuthStore.getCodeVerifier).toHaveBeenCalledWith('challenge_test-client-id');
      expect(generateCodeChallenge).toHaveBeenCalledWith(codeVerifier);
      expect(mockAuthStore.removeCodeVerifier).not.toHaveBeenCalled();
      expect(mockedHttpInstance.post).not.toHaveBeenCalled();
    });

    it('should handle token exchange errors', async () => {
      mockedHttpInstance.post.mockResolvedValueOnce({
        data: mockAppAccessTokenResponse,
      });

      mockedHttpInstance.post.mockResolvedValueOnce({
        data: { code: 99991663, msg: 'Token exchange failed' },
      });

      await expect(
        provider.exchangeAuthorizationCode(mockClient, 'invalid-code', undefined, 'http://example.com/callback'),
      ).rejects.toThrow('Token exchange failed');
    });

    it('should handle app access token errors', async () => {
      mockedHttpInstance.post.mockRejectedValueOnce(new Error('App token request failed'));

      await expect(
        provider.exchangeAuthorizationCode(mockClient, 'test-code', undefined, 'http://example.com/callback'),
      ).rejects.toThrow('App token request failed');
    });
  });

  describe('Token Refresh', () => {
    it('should successfully refresh tokens', async () => {
      const mockRefreshResponse = {
        code: 0,
        msg: 'success',
        data: {
          access_token: 'new-access-token',
          refresh_token: 'new-refresh-token',
          token_type: 'Bearer',
          expires_in: 3600,
          refresh_expires_in: 7200,
          scope: 'scope1 scope2',
        },
      };

      const storedToken: AuthInfo = {
        token: 'old-access-token',
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        extra: { refreshToken: 'old-refresh-token' },
      };

      mockAuthStore.getTokenByRefreshToken.mockResolvedValue(storedToken);

      mockedHttpInstance.post
        .mockResolvedValueOnce({ data: mockAppAccessTokenResponse })
        .mockResolvedValueOnce({ data: mockRefreshResponse });

      const result = await provider.exchangeRefreshToken(mockClient, 'old-refresh-token');

      expect(result).toEqual({
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'scope1 scope2',
      });

      expect(mockAuthStore.storeToken).toHaveBeenCalled();
    });

    it('should use app_id and app_secret from original token when available', async () => {
      const mockRefreshResponse = {
        code: 0,
        msg: 'success',
        data: {
          access_token: 'new-access-token',
          refresh_token: 'new-refresh-token',
          token_type: 'Bearer',
          expires_in: 3600,
          refresh_expires_in: 7200,
          scope: 'scope1 scope2',
        },
      };

      const storedToken: AuthInfo = {
        token: 'old-access-token',
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        extra: {
          refreshToken: 'old-refresh-token',
          app_id: 'custom-app-id',
          app_secret: 'custom-app-secret',
        },
      };

      mockAuthStore.getTokenByRefreshToken.mockResolvedValue(storedToken);

      mockedHttpInstance.post
        .mockResolvedValueOnce({ data: mockAppAccessTokenResponse })
        .mockResolvedValueOnce({ data: mockRefreshResponse });

      const result = await provider.exchangeRefreshToken(mockClient, 'old-refresh-token');

      // Verify that custom app_id and app_secret from original token are used
      expect(mockedHttpInstance.post).toHaveBeenNthCalledWith(
        1,
        'https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal',
        { app_id: 'custom-app-id', app_secret: 'custom-app-secret' },
        { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
      );

      expect(result).toEqual({
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'scope1 scope2',
      });

      expect(mockAuthStore.storeToken).toHaveBeenCalled();
    });

    it('should handle refresh token errors and invalid tokens', async () => {
      // Test non-existent refresh token
      mockAuthStore.getTokenByRefreshToken.mockResolvedValue(undefined);

      await expect(provider.exchangeRefreshToken(mockClient, 'non-existent-token')).rejects.toThrow(
        'refresh token is invalid',
      );

      // Test API error response
      mockAuthStore.getTokenByRefreshToken.mockResolvedValue({
        token: 'test-token',
        clientId: 'test-client-id',
        scopes: [],
        extra: { refreshToken: 'test-refresh-token' },
      });

      mockedHttpInstance.post
        .mockResolvedValueOnce({ data: mockAppAccessTokenResponse })
        .mockRejectedValueOnce({ response: { status: 401, data: 'Refresh failed' } });

      await expect(provider.exchangeRefreshToken(mockClient, 'test-refresh-token')).rejects.toThrow(
        'Token refresh failed: 401 Refresh failed',
      );
    });
  });

  describe('Token Validation', () => {
    it('should verify access tokens correctly', async () => {
      const validToken: AuthInfo = {
        token: 'valid-token',
        clientId: 'test-client-id',
        scopes: ['scope1', 'scope2'],
        expiresAt: Date.now() / 1000 + 3600,
      };

      (isTokenValid as jest.Mock).mockResolvedValue({
        valid: true,
        token: validToken,
      });

      const result = await provider.verifyAccessToken('valid-token');

      expect(result).toEqual(validToken);
    });

    it('should handle invalid tokens', async () => {
      const invalidToken: AuthInfo = {
        token: 'invalid-token',
        clientId: 'test-client-id',
        scopes: [],
        expiresAt: 1,
        extra: {},
      };

      (isTokenValid as jest.Mock).mockResolvedValue({
        valid: false,
        token: invalidToken,
      });

      const result = await provider.verifyAccessToken('invalid-token');
      expect(result).toEqual(invalidToken);
    });

    it('should handle non-existent tokens', async () => {
      (isTokenValid as jest.Mock).mockResolvedValue({
        valid: false,
        token: null,
      });

      const result = await provider.verifyAccessToken('non-existent-token');

      expect(result).toEqual({
        token: '',
        clientId: '',
        scopes: [],
        expiresAt: 1,
        extra: {},
      });
    });
  });
});
