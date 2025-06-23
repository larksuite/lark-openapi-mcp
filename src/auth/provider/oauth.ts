import { Response } from 'express';
import { OAuthRegisteredClientsStore } from '@modelcontextprotocol/sdk/server/auth/clients.js';
import { OAuthClientInformationFull, OAuthTokens, OAuthTokensSchema } from '@modelcontextprotocol/sdk/shared/auth.js';
import { AuthorizationParams, OAuthServerProvider } from '@modelcontextprotocol/sdk/server/auth/provider.js';
import { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import { authStore } from '../store';
import { isTokenValid } from '../utils/is-token-valid';
import { LarkProxyOAuthServerProviderOptions } from './types';
import { commonHttpInstance } from '../../utils/http-instance';
import { logger } from '../../utils/logger';

interface OAuth2OAuthEndpoints {
  authorizationUrl: string;
  tokenUrl: string;
  registrationUrl: string;
}

export class LarkOAuth2OAuthServerProvider implements OAuthServerProvider {
  private readonly _endpoints: OAuth2OAuthEndpoints;

  private readonly _options: LarkProxyOAuthServerProviderOptions;

  skipLocalPkceValidation = true;

  constructor(options: LarkProxyOAuthServerProviderOptions) {
    const { domain } = options;
    this._endpoints = {
      authorizationUrl: `${domain}/open-apis/authen/v1/authorize`,
      tokenUrl: `${domain}/open-apis/authen/v2/oauth/token`,
      registrationUrl: `${domain}/open-apis/authen/v1/index`,
    };
    this._options = options;
  }

  get clientsStore(): OAuthRegisteredClientsStore {
    return authStore;
  }

  async authorize(_client: OAuthClientInformationFull, params: AuthorizationParams, res: Response): Promise<void> {
    const targetUrl = new URL(this._endpoints.authorizationUrl);

    const searchParams = new URLSearchParams({
      client_id: this._options.appId,
      response_type: 'code',
      redirect_uri: this._options.callbackUrl + '?redirect_uri=' + _client.redirect_uris[0],
      code_challenge: params.codeChallenge,
      code_challenge_method: 'S256',
    });
    if (params.state) {
      searchParams.set('state', params.state);
    }
    if (params.scopes?.length) {
      searchParams.set('scope', params.scopes.join(' '));
    }
    targetUrl.search = searchParams.toString();
    logger.info(
      `[LarkOAuth2OAuthServerProvider] Authorizing client ${_client.client_id} Redirecting to authorization URL: ${targetUrl.toString()}`,
    );
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
    redirectUri?: string,
  ): Promise<OAuthTokens> {
    const params = {
      grant_type: 'authorization_code',
      client_id: this._options.appId,
      client_secret: this._options.appSecret,
      code: authorizationCode,
      redirect_uri: this._options.callbackUrl + '?redirect_uri=' + redirectUri,
      code_verifier: codeVerifier,
    };

    try {
      logger.info(
        `[LarkOAuth2OAuthServerProvider] Exchanging authorization code for client ${client.client_id}; appId: ${this._options.appId}`,
      );
      const response = await commonHttpInstance.post(this._endpoints.tokenUrl, params, {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });

      const data = response.data;
      const token = OAuthTokensSchema.parse(data);

      const expiresAt = token.expires_in ? token.expires_in + Date.now() / 1000 : undefined;

      await authStore.storeToken({
        clientId: client.client_id,
        token: token.access_token,
        scopes: token.scope?.split(' ') || [],
        expiresAt,
        extra: {
          token,
          refreshToken: token.refresh_token,
          appId: this._options.appId,
          appSecret: this._options.appSecret,
        },
      });

      logger.info(
        `[LarkOAuth2OAuthServerProvider] Successfully exchanged authorization code for client ${client.client_id}; appId: ${this._options.appId}; token: ${Boolean(token.access_token)}; refreshToken: ${Boolean(token.refresh_token)};expiresAt: ${expiresAt} `,
      );

      return token;
    } catch (error: any) {
      logger.error(
        `[LarkOAuth2OAuthServerProvider] Token exchange failed: ${error.response?.status || error.status} ${error.response?.data || error.message}`,
      );
      throw new Error(
        `Token exchange failed: ${error.response?.status || error.status} ${error.response?.data || error.message}`,
      );
    }
  }

  async exchangeRefreshToken(
    client: OAuthClientInformationFull,
    refreshToken: string,
    scopes?: string[],
  ): Promise<OAuthTokens> {
    const originalToken = await authStore.getTokenByRefreshToken(refreshToken);
    if (!originalToken) {
      logger.error(`[LarkOAuth2OAuthServerProvider] refresh token is invalid, cannot get original token`);
      throw new Error('refresh token is invalid');
    }

    const appId = (originalToken.extra?.app_id as string) || this._options.appId;
    const appSecret = (originalToken.extra?.app_secret as string) || this._options.appSecret;

    const params: Record<string, string> = {
      grant_type: 'refresh_token',
      client_id: appId,
      client_secret: appSecret,
      refresh_token: refreshToken,
    };

    if (scopes?.length) {
      params.scope = scopes.join(' ');
    }
    try {
      logger.info(`[LarkOAuth2OAuthServerProvider] Refreshing token for client ${client.client_id}; appId: ${appId}`);
      const response = await commonHttpInstance.post(this._endpoints.tokenUrl, params, {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });

      const data = response.data;
      const token = OAuthTokensSchema.parse(data);

      const expiresAt = token.expires_in ? token.expires_in + Date.now() / 1000 : undefined;

      await authStore.storeToken({
        clientId: client.client_id,
        token: token.access_token,
        scopes: token.scope?.split(' ') || [],
        expiresAt,
        extra: { refreshToken: token.refresh_token, token, appId, appSecret },
      });

      logger.info(
        `[LarkOAuth2OAuthServerProvider] Successfully refreshed token for client ${client.client_id}; appId: ${appId}; token: ${Boolean(token.access_token)}; refreshToken: ${Boolean(token.refresh_token)};expiresAt: ${expiresAt}`,
      );

      return token;
    } catch (error: any) {
      logger.error(
        `[LarkOAuth2OAuthServerProvider] Token refresh failed: ${error.response?.status || error.status} ${error.response?.data || error.message}`,
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
