import { TokenRefreshManager } from '../../../src/mcp-tool/utils/token-refresh';
import { Client } from '@larksuiteoapi/node-sdk';

// Mock Lark Client
const mockClient = {
  request: jest.fn(),
} as unknown as Client;

describe('TokenRefreshManager', () => {
  let manager: TokenRefreshManager;

  beforeEach(() => {
    jest.clearAllMocks();
    manager = new TokenRefreshManager(mockClient, {
      refreshThresholdMinutes: 1,
      tokenExpiresInSeconds: 300,
    });
  });

  afterEach(() => {
    manager.stop();
  });

  describe('initialization', () => {
    it('should initialize with token info', () => {
      const accessToken = 'test-access-token';
      const refreshToken = 'test-refresh-token';
      
      manager.initialize(accessToken, refreshToken);
      
      const tokenInfo = manager.getCurrentToken();
      expect(tokenInfo).toBeTruthy();
      expect(tokenInfo?.accessToken).toBe(accessToken);
      expect(tokenInfo?.refreshToken).toBe(refreshToken);
      expect(tokenInfo?.expiresIn).toBe(300);
    });

    it('should use default expiry time when not provided', () => {
      manager.initialize('token', 'refresh');
      
      const tokenInfo = manager.getCurrentToken();
      expect(tokenInfo?.expiresIn).toBe(300);
    });
  });

  describe('token refresh', () => {
    beforeEach(() => {
      (mockClient.request as jest.Mock).mockResolvedValue({
        data: {
          code: 0,
          data: {
            access_token: 'new-access-token',
            refresh_token: 'new-refresh-token',
            expires_in: 300,
            token_type: 'Bearer',
          },
        },
      });
    });

    it('should refresh token when requested', async () => {
      manager.initialize('old-token', 'old-refresh', 300);
      
      const newToken = await manager.refreshToken();
      
      expect(mockClient.request).toHaveBeenCalledWith({
        method: 'POST',
        url: '/open-apis/authen/v1/oidc/refresh_access_token',
        data: {
          grant_type: 'refresh_token',
          refresh_token: 'old-refresh',
        },
      });
      
      expect(newToken.accessToken).toBe('new-access-token');
      expect(newToken.refreshToken).toBe('new-refresh-token');
    });

    it('should retry on failure', async () => {
      (mockClient.request as jest.Mock)
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          data: {
            code: 0,
            data: {
              access_token: 'retry-token',
              refresh_token: 'retry-refresh',
              expires_in: 300,
            },
          },
        });

      manager.initialize('token', 'refresh');
      
      const newToken = await manager.refreshToken();
      
      expect(mockClient.request).toHaveBeenCalledTimes(2);
      expect(newToken.accessToken).toBe('retry-token');
    });

    it('should handle API error responses', async () => {
      (mockClient.request as jest.Mock).mockResolvedValue({
        data: {
          code: 1001,
          msg: 'Invalid refresh token',
        },
      });

      manager.initialize('token', 'invalid-refresh');
      
      await expect(manager.refreshToken()).rejects.toThrow('Token refresh failed: Invalid refresh token');
    });
  });

  describe('automatic refresh', () => {
    it('should get fresh token when needed', async () => {
      const pastTime = Date.now() - 1000; // 1 second ago
      manager.initialize('old-token', 'refresh-token', 1); // 1 second expiry
      
      // Mock the token to be expired
      const tokenInfo = manager.getCurrentToken();
      if (tokenInfo) {
        tokenInfo.expiresAt = pastTime;
      }

      (mockClient.request as jest.Mock).mockResolvedValue({
        data: {
          code: 0,
          data: {
            access_token: 'fresh-token',
            refresh_token: 'fresh-refresh',
            expires_in: 300,
          },
        },
      });

      const token = await manager.getAccessToken();
      
      expect(token).toBe('fresh-token');
      expect(mockClient.request).toHaveBeenCalled();
    });
  });

  describe('callbacks', () => {
    it('should call onTokenRefreshed callback', async () => {
      const onTokenRefreshed = jest.fn();
      const onRefreshError = jest.fn();
      
      manager = new TokenRefreshManager(mockClient, {
        onTokenRefreshed,
        onRefreshError,
      });

      (mockClient.request as jest.Mock).mockResolvedValue({
        data: {
          code: 0,
          data: {
            access_token: 'callback-token',
            refresh_token: 'callback-refresh',
            expires_in: 300,
          },
        },
      });

      manager.initialize('token', 'refresh');
      await manager.refreshToken();
      
      expect(onTokenRefreshed).toHaveBeenCalledWith(
        expect.objectContaining({
          accessToken: 'callback-token',
          refreshToken: 'callback-refresh',
        })
      );
      expect(onRefreshError).not.toHaveBeenCalled();
    });

    it('should call onRefreshError callback on failure', async () => {
      const onTokenRefreshed = jest.fn();
      const onRefreshError = jest.fn();
      
      manager = new TokenRefreshManager(mockClient, {
        maxRetries: 1,
        onTokenRefreshed,
        onRefreshError,
      });

      (mockClient.request as jest.Mock).mockRejectedValue(new Error('Refresh failed'));

      manager.initialize('token', 'refresh');
      
      await expect(manager.refreshToken()).rejects.toThrow();
      
      expect(onTokenRefreshed).not.toHaveBeenCalled();
      expect(onRefreshError).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});