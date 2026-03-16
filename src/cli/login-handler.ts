import express from 'express';
import { LarkAuthHandlerLocal } from '../auth/handler/handler-local';
import { authStore } from '../auth/store';
import { isTokenExpired } from '../auth/utils';
import open from 'open';

export interface LoginOptions {
  appId: string;
  appSecret: string;
  domain: string;
  host: string;
  port: string;
  callbackHost?: string;
  scope?: string[];
  timeout?: number;
}

export class LoginHandler {
  static async checkTokenWithTimeout(timeout: number, appId: string): Promise<boolean> {
    let time = 0;
    return new Promise((resolve) => {
      const interval = setInterval(async () => {
        const token = await authStore.getLocalAccessToken(appId);
        if (token) {
          clearInterval(interval);
          resolve(true);
        }
        time += 2000;
        if (time >= timeout) {
          clearInterval(interval);
          resolve(false);
        }
      }, 2000);
    });
  }

  static async handleLogin(options: LoginOptions): Promise<void> {
    const { appId, appSecret, domain, host, callbackHost, port, scope, timeout = 60000 } = options;

    if (!appId || !appSecret) {
      console.error('Error: Missing App Credentials (appId and appSecret are required for login)');
      process.exit(1);
    }

    try {
      console.log('🔐 Starting OAuth login process...');

      const app = express();
      app.use(express.json());

      const authHandler = new LarkAuthHandlerLocal(app, {
        port: parseInt(port),
        host,
        callbackHost,
        domain,
        appId,
        appSecret,
        scope,
      });
      authHandler.setupRoutes();

      const result = await authHandler.reAuthorize(undefined, true);

      if (result.authorizeUrl) {
        console.log('📱 Please open the following URL in your browser to complete the login:');
        console.log(
          `💡 Note: Please ensure the redirect URL (${authHandler.callbackUrl}) is configured in your app's security settings.`,
        );
        console.log(`   If not configured yet, go to: ${domain}/app/${appId}/safe`);
        console.log('🔗 Authorization URL:');
        console.log(result.authorizeUrl);
        console.log('\n⏳ Waiting for authorization... (timeout in 60 seconds)');
        open(result.authorizeUrl);

        await authStore.removeLocalAccessToken(appId);
        const success = await this.checkTokenWithTimeout(timeout, appId);

        if (success) {
          console.log('✅ Successfully logged in');
          process.exit(0);
        } else {
          console.log('❌ Login failed');
          process.exit(1);
        }
      } else {
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Login failed:', error);
      process.exit(1);
    }
  }

  static async handleLogout(appId?: string): Promise<void> {
    try {
      console.log('🔓 Logging out...');

      if (!appId) {
        await authStore.removeAllLocalAccessTokens();
        console.log('✅ Successfully logged out from all apps');
        process.exit(0);
      }

      const currentToken = await authStore.getLocalAccessToken(appId);
      if (!currentToken) {
        console.log(`ℹ️ No active login session found for app: ${appId}`);
        process.exit(0);
      }

      await authStore.removeLocalAccessToken(appId);
      console.log(`✅ Successfully logged out from app: ${appId}`);
      process.exit(0);
    } catch (error) {
      console.error('❌ Logout failed:', error);
      process.exit(1);
    }
  }

  private static simpleMask(str: string | undefined): string {
    if (!str) {
      return '';
    }

    if (str.length < 6) {
      return '*'.repeat(str.length);
    }

    return str.slice(0, 4) + '*'.repeat(str.length - 6) + str.slice(-2);
  }

  static async handleWhoAmI(): Promise<void> {
    const tokens = await authStore.getAllLocalAccessTokens();

    if (Object.keys(tokens).length <= 0) {
      console.log('ℹ️ No active login sessions found');
      process.exit(0);
    }

    console.log('👤 Current login sessions:\n');

    for (const [appId, accessToken] of Object.entries(tokens)) {
      const token = await authStore.getToken(accessToken);
      if (!token) {
        console.log('❌ No token info found');
        continue;
      }
      console.log(`📱 App ID: ${appId}`);
      console.log(`⌚️ AccessToken Expired: ${isTokenExpired(token)}`);
      console.log(`🔐 Token Info:`);
      console.log(
        JSON.stringify(
          {
            clientId: token.clientId,
            token: this.simpleMask(token.token),
            scopes: token.scopes,
            expiresAt: token.expiresAt,
            extra: {
              refreshToken: this.simpleMask(token.extra?.refreshToken as string),
              appId: token.extra?.appId,
              appSecret: this.simpleMask(token.extra?.appSecret as string),
            },
          },
          null,
          2,
        ),
      );
      console.log('\n');
    }
    process.exit(0);
  }
}