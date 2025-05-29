import crypto from 'crypto';
import { URLSearchParams } from 'url';

export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  domain?: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface AuthorizeOptions {
  scope?: string;
  state?: string;
}

export class FeishuOAuth {
  private config: OAuthConfig;
  private baseUrl: string;

  constructor(config: OAuthConfig) {
    this.config = config;
    this.baseUrl = config.domain || 'https://passport.feishu.cn';
  }

  /**
   * Generate OAuth authorization URL
   */
  generateAuthUrl(options: AuthorizeOptions = {}): string {
    const state = options.state || crypto.randomBytes(16).toString('hex');
    const scope = options.scope || 'user:email';

    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope,
      state,
    });

    return `${this.baseUrl}/suite/passport/oauth/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for tokens
   */
  async exchangeCodeForTokens(code: string): Promise<TokenResponse> {
    const tokenUrl = `${this.baseUrl}/suite/passport/oauth/token`;
    
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: this.config.redirectUri,
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`OAuth error: ${data.error} - ${data.error_description}`);
    }

    return data as TokenResponse;
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    const tokenUrl = `${this.baseUrl}/suite/passport/oauth/token`;
    
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`OAuth error: ${data.error} - ${data.error_description}`);
    }

    return data as TokenResponse;
  }
}