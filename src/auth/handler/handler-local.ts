import http from 'http';
import { Request, Response } from 'express';
import { LarkAuthHandler } from './handler';
import { authStore } from '../store';
import { isTokenValid } from '../utils/is-token-valid';
import { generatePKCEPair } from '../utils/pkce';
import { logger } from '../../utils/logger';

export class LarkAuthHandlerLocal extends LarkAuthHandler {
  private static readonly LOCAL_CLIENT_ID = 'client_id_for_local_auth';

  private expressServer: http.Server | null = null;
  private timeoutId: NodeJS.Timeout | null = null;

  private async startServer() {
    if (this.expressServer) {
      return;
    }

    return new Promise((resolve, reject) => {
      logger.info(`[LarkAuthHandlerLocal] Starting server on ${this.options.host}:${this.options.port}`);
      this.expressServer = this.app.listen(this.options.port, this.options.host, (error) => {
        if (error) {
          reject(error);
        }
        logger.info(`[LarkAuthHandlerLocal] Server started on ${this.options.host}:${this.options.port}`);
        resolve(true);
      });
    });
  }

  private async stopServer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    return new Promise<boolean>((resolve, reject) => {
      if (!this.expressServer) {
        resolve(true);
        return;
      }
      logger.info(`[LarkAuthHandlerLocal] Stopping server`);
      this.expressServer.close((error) => {
        if (error) {
          reject(error);
        } else {
          logger.info(`[LarkAuthHandlerLocal] Server stopped`);
          resolve(true);
        }
        this.expressServer = null;
      });
    });
  }

  protected async callback(req: Request, res: Response) {
    if (!req.query.code || typeof req.query.code !== 'string') {
      logger.error(`[LarkAuthHandlerLocal] callback: Failed to exchange authorization code: ${req.query.code}`);
      res.end('error, failed to exchange authorization code, please try again');
      return;
    }

    const codeVerifier = authStore.getCodeVerifier(LarkAuthHandlerLocal.LOCAL_CLIENT_ID);
    if (!codeVerifier) {
      logger.error(`[LarkAuthHandlerLocal] callback: Code verifier not found`);
      res.end('error: code_verifier not found, please try again');
      return;
    }

    const token = await this.provider.exchangeAuthorizationCode(
      { client_id: LarkAuthHandlerLocal.LOCAL_CLIENT_ID, redirect_uris: [] },
      req.query.code,
      codeVerifier,
      this.callbackUrl,
    );

    authStore.removeCodeVerifier(LarkAuthHandlerLocal.LOCAL_CLIENT_ID);

    await authStore.storeLocalAccessToken(token.access_token, this.options.appId);

    logger.info(`[LarkAuthHandlerLocal] callback: Successfully exchanged authorization code`);
    res.end('success, you can close this page now');

    setTimeout(async () => {
      try {
        await this.stopServer();
      } catch (error) {
        logger.error(`[LarkAuthHandlerLocal] callback: Error stopping server: ${error}`);
      }
    }, 1000);
  }

  async refreshToken(accessToken: string) {
    const newToken = await super.refreshToken(accessToken);
    await authStore.storeLocalAccessToken(newToken.access_token, this.options.appId);
    return newToken;
  }

  async reAuthorize(accessToken?: string) {
    const localAccessToken = await authStore.getLocalAccessToken(this.options.appId);
    const { valid } = await isTokenValid(localAccessToken);

    if (accessToken === localAccessToken || !localAccessToken || !valid) {
      const scope = this.options.scope?.join(' ');
      logger.info(`[LarkAuthHandlerLocal] reAuthorize: Registering client`);
      await authStore.registerClient({
        client_id: LarkAuthHandlerLocal.LOCAL_CLIENT_ID,
        client_secret: LarkAuthHandlerLocal.LOCAL_CLIENT_ID,
        scope,
        redirect_uris: [this.callbackUrl],
      });

      await this.startServer();
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => this.stopServer(), 60 * 1000);

      const { codeVerifier, codeChallenge } = generatePKCEPair();
      authStore.storeCodeVerifier(LarkAuthHandlerLocal.LOCAL_CLIENT_ID, codeVerifier);

      const authorizeUrl = new URL(`http://${this.options.host}:${this.options.port}/authorize`);
      authorizeUrl.searchParams.set('client_id', LarkAuthHandlerLocal.LOCAL_CLIENT_ID);
      authorizeUrl.searchParams.set('response_type', 'code');
      authorizeUrl.searchParams.set('code_challenge', codeChallenge);
      authorizeUrl.searchParams.set('code_challenge_method', 'S256');
      authorizeUrl.searchParams.set('redirect_uri', this.callbackUrl);
      authorizeUrl.searchParams.set('state', 'reauthorize');
      if (scope) {
        authorizeUrl.searchParams.set('scope', scope);
      }

      return {
        accessToken: '',
        authorizeUrl: authorizeUrl.toString(),
      };
    }

    return { accessToken: localAccessToken, authorizeUrl: '' };
  }
}
