import { Response } from 'express';
import { OAuthRegisteredClientsStore } from '@modelcontextprotocol/sdk/server/auth/clients.js';
import { OAuthClientInformationFull, OAuthTokens } from '@modelcontextprotocol/sdk/shared/auth.js';
import { AuthorizationParams, OAuthServerProvider } from '@modelcontextprotocol/sdk/server/auth/provider.js';
import { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import { authStore } from '../store';
import { isTokenValid } from '../utils/is-token-valid';
import { generateCodeChallenge } from '../utils/pkce';
import { z } from 'zod';
import { LarkProxyOAuthServerProviderOptions } from './types';
import { commonHttpInstance } from '../../utils/http-instance';
import { logger } from '../../utils/logger';

const LarkOIDCTokenSchema = z.object({
  code: z.number(),
  msg: z.string().optional(),
  data: z.object({
    access_token: z.string(),
    token_type: z.string(),
    refresh_token: z.string().optional(),
    expires_in: z.number().optional(),
    refresh_expires_in: z.number().optional(),
    scope: z.string().optional(),
  }),
});

interface OAuth2OAuthEndpoints {
  appAccessTokenUrl: string;
  authorizationUrl: string;
  tokenUrl: string;
  refreshTokenUrl: string;
  registrationUrl: string;
}

export class LarkOIDC2OAuthServerProvider implements OAuthServerProvider {
  private readonly _endpoints: OAuth2OAuthEndpoints;

  private readonly _options: LarkProxyOAuthServerProviderOptions;

  skipLocalPkceValidation = true;

  constructor(options: LarkProxyOAuthServerProviderOptions) {
    const { domain } = options;

    this._endpoints = {
      appAccessTokenUrl: `${domain}/open-apis/auth/v3/app_access_token/internal`,
      authorizationUrl: `${domain}/open-apis/authen/v1/index`,
      tokenUrl: `${domain}/open-apis/authen/v1/oidc/access_token`,
      refreshTokenUrl: `${domain}/open-apis/authen/v1/oidc/refresh_access_token`,
      registrationUrl: `${domain}/open-apis/authen/v1/index`,
    };
    this._options = options;
  }

  get clientsStore(): OAuthRegisteredClientsStore {
    return authStore;
  }

  async authorize(client: OAuthClientInformationFull, params: AuthorizationParams, res: Response): Promise<void> {
    const targetUrl = new URL(this._endpoints.authorizationUrl);
    const searchParams = new URLSearchParams({
      app_id: this._options.appId,
      redirect_uri: this._options.callbackUrl + '?redirect_uri=' + client.redirect_uris[0],
    });
    if (params.state) {
      searchParams.set('state', params.state);
    }
    if (params.codeChallenge) {
      authStore.storeCodeVerifier(`challenge_${client.client_id}`, params.codeChallenge);
    }
    targetUrl.search = searchParams.toString();
    logger.info(`[LarkOIDC2OAuthServerProvider] Redirecting to authorization URL: ${targetUrl.toString()}`);
    res.redirect(targetUrl.toString());
  }

  async challengeForAuthorizationCode(
    _client: OAuthClientInformationFull,
    _authorizationCode: string,
  ): Promise<string> {
    return '';
  }

  async exchangeAuthorizationCode(
    client: OAuthClientInformationFull,
    authorizationCode: string,
    codeVerifier?: string,
    _redirectUri?: string,
  ): Promise<OAuthTokens> {
    if (codeVerifier) {
      const storedChallenge = authStore.getCodeVerifier(`challenge_${client.client_id}`);
      if (!storedChallenge) {
        logger.error(
          `[LarkOIDC2OAuthServerProvider] exchangeAuthorizationCode: PKCE validation failed: code challenge not found`,
        );
        throw new Error('PKCE validation failed: code challenge not found');
      }
      const expectedChallenge = generateCodeChallenge(codeVerifier);
      if (expectedChallenge !== storedChallenge) {
        logger.error(
          `[LarkOIDC2OAuthServerProvider] exchangeAuthorizationCode: PKCE validation failed: code verifier does not match challenge`,
        );
        throw new Error('PKCE validation failed: code verifier does not match challenge');
      }
      authStore.removeCodeVerifier(`challenge_${client.client_id}`);
    }

    const params: Record<string, string> = {
      grant_type: 'authorization_code',
      code: authorizationCode,
    };

    try {
      logger.info(
        `[LarkOIDC2OAuthServerProvider] Exchanging authorization code for client ${client.client_id}; appId: ${this._options.appId}`,
      );
      const appAccessTokenResponse = await commonHttpInstance.post(
        this._endpoints.appAccessTokenUrl,
        { app_id: this._options.appId, app_secret: this._options.appSecret },
        { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
      );

      const { app_access_token: appAccessToken } = appAccessTokenResponse.data;

      const response = await commonHttpInstance.post(this._endpoints.tokenUrl, params, {
        headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${appAccessToken}` },
      });

      const data = response.data;
      const token = LarkOIDCTokenSchema.parse(data);
      const expiresAt = token.data.expires_in ? token.data.expires_in + Date.now() / 1000 : undefined;

      await authStore.storeToken({
        clientId: client.client_id,
        token: token.data.access_token,
        scopes: token.data.scope?.split(' ') || [],
        expiresAt,
        extra: {
          refreshToken: token.data.refresh_token,
          token,
          appId: this._options.appId,
          appSecret: this._options.appSecret,
        },
      });

      logger.info(
        `[LarkOIDC2OAuthServerProvider] Successfully exchanged authorization code for client ${client.client_id}; appId: ${this._options.appId}; token: ${Boolean(token.data.access_token)}; refreshToken: ${Boolean(token.data.refresh_token)};expiresAt: ${expiresAt}`,
      );

      return {
        access_token: token.data.access_token,
        token_type: token.data.token_type,
        expires_in: token.data.expires_in,
        scope: token.data.scope,
        refresh_token: token.data.refresh_token,
      };
    } catch (error: any) {
      logger.error(
        `[LarkOIDC2OAuthServerProvider] exchangeAuthorizationCode: Token exchange failed: ${error.response?.status || error.status} ${error.response?.data || error.message}`,
      );
      throw new Error(
        `Token exchange failed: ${error.response?.status || error.status} ${error.response?.data || error.message}`,
      );
    }
  }

  async exchangeRefreshToken(
    client: OAuthClientInformationFull,
    refreshToken: string,
    _scopes?: string[],
  ): Promise<OAuthTokens> {
    const originalToken = await authStore.getTokenByRefreshToken(refreshToken);
    if (!originalToken) {
      logger.error(`[LarkOIDC2OAuthServerProvider] exchangeRefreshToken: Refresh token is invalid`);
      throw new Error('refresh token is invalid');
    }

    const appId = (originalToken.extra?.app_id as string) || this._options.appId;
    const appSecret = (originalToken.extra?.app_secret as string) || this._options.appSecret;

    try {
      logger.info(`[LarkOIDC2OAuthServerProvider] Refreshing token for client ${client.client_id}`);
      const appAccessTokenResponse = await commonHttpInstance.post(
        this._endpoints.appAccessTokenUrl,
        { app_id: appId, app_secret: appSecret },
        { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
      );

      const { app_access_token: appAccessToken } = appAccessTokenResponse.data;

      const response = await commonHttpInstance.post(
        this._endpoints.refreshTokenUrl,
        { grant_type: 'refresh_token', refresh_token: refreshToken },
        { headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${appAccessToken}` } },
      );

      const data = response.data;
      const token = LarkOIDCTokenSchema.parse(data);

      const expiresAt = token.data.expires_in ? token.data.expires_in + Date.now() / 1000 : undefined;
      await authStore.storeToken({
        clientId: client.client_id,
        token: token.data.access_token,
        scopes: token.data.scope?.split(' ') || [],
        expiresAt,
        extra: { refreshToken: token.data.refresh_token, token, appId, appSecret },
      });

      logger.info(
        `[LarkOIDC2OAuthServerProvider] Successfully refreshed token for client ${client.client_id}; appId: ${appId}; token: ${Boolean(token.data.access_token)}; refreshToken: ${Boolean(token.data.refresh_token)};expiresAt: ${expiresAt}`,
      );

      return {
        access_token: token.data.access_token,
        token_type: token.data.token_type,
        expires_in: token.data.expires_in,
        scope: token.data.scope,
        refresh_token: token.data.refresh_token,
      };
    } catch (error: any) {
      logger.error(
        `[LarkOIDC2OAuthServerProvider] exchangeRefreshToken: Token refresh failed: ${error.response?.status || error.status} ${error.response?.data || error.message}`,
      );
      throw new Error(
        `Token refresh failed: ${error.response?.status || error.status} ${error.response?.data || error.message}`,
      );
    }
  }

  async verifyAccessToken(token: string): Promise<AuthInfo> {
    const { valid, token: storedToken } = await isTokenValid(token);
    if (!valid) {
      return {
        token: storedToken?.token || '',
        clientId: storedToken?.clientId || '',
        scopes: storedToken?.scopes || [],
        expiresAt: storedToken?.expiresAt || 1,
        extra: storedToken?.extra || {},
      };
    }
    return storedToken!;
  }
}
