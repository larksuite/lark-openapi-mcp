import fs from 'fs';
import path from 'path';
import os from 'os';

export interface StoredTokens {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  token_type: string;
}

export class TokenStorage {
  private configDir: string;
  private tokenFilePath: string;

  constructor(configDir?: string) {
    this.configDir = configDir || path.join(os.homedir(), '.lark-mcp');
    this.tokenFilePath = path.join(this.configDir, 'tokens.json');
    this.ensureConfigDir();
  }

  private ensureConfigDir(): void {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true });
    }
  }

  /**
   * Store tokens to file
   */
  async storeTokens(tokens: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
  }): Promise<void> {
    const storedTokens: StoredTokens = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: Date.now() + tokens.expires_in * 1000,
      token_type: tokens.token_type,
    };

    await fs.promises.writeFile(
      this.tokenFilePath,
      JSON.stringify(storedTokens, null, 2),
      'utf-8'
    );
  }

  /**
   * Load tokens from file
   */
  async loadTokens(): Promise<StoredTokens | null> {
    try {
      if (!fs.existsSync(this.tokenFilePath)) {
        return null;
      }

      const content = await fs.promises.readFile(this.tokenFilePath, 'utf-8');
      return JSON.parse(content) as StoredTokens;
    } catch (error) {
      console.warn('Failed to load tokens:', error);
      return null;
    }
  }

  /**
   * Check if access token is expired
   */
  isAccessTokenExpired(tokens: StoredTokens): boolean {
    return Date.now() >= tokens.expires_at - 300000; // 5 minutes buffer
  }

  /**
   * Clear stored tokens
   */
  async clearTokens(): Promise<void> {
    if (fs.existsSync(this.tokenFilePath)) {
      await fs.promises.unlink(this.tokenFilePath);
    }
  }

  /**
   * Get valid access token (refresh if needed)
   */
  async getValidAccessToken(
    refreshTokenFn: (refreshToken: string) => Promise<{
      access_token: string;
      refresh_token: string;
      expires_in: number;
      token_type: string;
    }>
  ): Promise<string | null> {
    const tokens = await this.loadTokens();
    
    if (!tokens) {
      return null;
    }

    if (!this.isAccessTokenExpired(tokens)) {
      return tokens.access_token;
    }

    try {
      const newTokens = await refreshTokenFn(tokens.refresh_token);
      await this.storeTokens(newTokens);
      return newTokens.access_token;
    } catch (error) {
      console.warn('Failed to refresh token:', error);
      await this.clearTokens();
      return null;
    }
  }
}