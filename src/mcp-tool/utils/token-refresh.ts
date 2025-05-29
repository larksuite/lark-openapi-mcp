import * as lark from '@larksuiteoapi/node-sdk';
import { TokenRefreshOptions } from '../types';

export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // Unix timestamp
  expiresIn?: number; // Seconds until expiration
}

export interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope?: string;
}

export class TokenRefreshManager {
  private client: lark.Client;
  private currentToken: TokenInfo | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;
  private options: Required<TokenRefreshOptions>;

  constructor(client: lark.Client, options: TokenRefreshOptions = {}) {
    this.client = client;
    this.options = {
      refreshThresholdMinutes: 1,
      maxRetries: 3,
      retryDelayMs: 1000,
      tokenExpiresInSeconds: 300,
      onTokenRefreshed: () => {},
      onRefreshError: () => {},
      ...options,
    };
  }

  /**
   * Initialize with an existing token and start auto-refresh
   */
  initialize(accessToken: string, refreshToken: string, expiresIn?: number): void {
    const tokenExpiresIn = expiresIn || this.options.tokenExpiresInSeconds;
    const expiresAt = Date.now() + (tokenExpiresIn * 1000);
    this.currentToken = {
      accessToken,
      refreshToken,
      expiresAt,
      expiresIn: tokenExpiresIn,
    };
    this.scheduleRefresh();
  }

  /**
   * Get current access token, refreshing if necessary
   */
  async getAccessToken(): Promise<string> {
    if (!this.currentToken) {
      throw new Error('Token manager not initialized');
    }

    if (this.shouldRefreshToken()) {
      await this.refreshToken();
    }

    return this.currentToken.accessToken;
  }

  /**
   * Get current token info
   */
  getCurrentToken(): TokenInfo | null {
    return this.currentToken;
  }

  /**
   * Manually refresh the token
   */
  async refreshToken(): Promise<TokenInfo> {
    if (!this.currentToken) {
      throw new Error('No token available to refresh');
    }

    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= this.options.maxRetries; attempt++) {
      try {
        const refreshedToken = await this.performTokenRefresh(this.currentToken.refreshToken);
        
        const expiresAt = Date.now() + (refreshedToken.expires_in * 1000);
        this.currentToken = {
          accessToken: refreshedToken.access_token,
          refreshToken: refreshedToken.refresh_token,
          expiresAt,
          expiresIn: refreshedToken.expires_in,
        };

        this.scheduleRefresh();
        this.options.onTokenRefreshed(this.currentToken);
        
        return this.currentToken;
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < this.options.maxRetries) {
          await this.delay(this.options.retryDelayMs);
        }
      }
    }

    this.options.onRefreshError(lastError!);
    throw lastError;
  }

  /**
   * Stop auto-refresh
   */
  stop(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  /**
   * Check if token needs refreshing
   */
  private shouldRefreshToken(): boolean {
    if (!this.currentToken) {
      return false;
    }

    const thresholdMs = this.options.refreshThresholdMinutes * 60 * 1000;
    return (this.currentToken.expiresAt - Date.now()) <= thresholdMs;
  }

  /**
   * Schedule the next refresh
   */
  private scheduleRefresh(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    if (!this.currentToken) {
      return;
    }

    const thresholdMs = this.options.refreshThresholdMinutes * 60 * 1000;
    const timeUntilRefresh = this.currentToken.expiresAt - Date.now() - thresholdMs;
    
    if (timeUntilRefresh > 0) {
      this.refreshTimer = setTimeout(() => {
        this.refreshToken().catch(error => {
          this.options.onRefreshError(error);
        });
      }, timeUntilRefresh);
    }
  }

  /**
   * Perform the actual token refresh API call
   */
  private async performTokenRefresh(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const response = await this.client.request({
        method: 'POST',
        url: '/open-apis/authen/v1/oidc/refresh_access_token',
        data: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
      });

      if (response.data?.code !== 0) {
        throw new Error(`Token refresh failed: ${response.data?.msg || 'Unknown error'}`);
      }

      return response.data.data;
    } catch (error) {
      throw new Error(`Token refresh request failed: ${(error as any)?.message || error}`);
    }
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}