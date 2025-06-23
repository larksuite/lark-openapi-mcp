import { AuthStore, authStore } from '../../src/auth/store';
import { generatePKCEPair } from '../../src/auth/utils/pkce';
import { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import { storageManager } from '../../src/auth/utils/storage-manager';

// Mock fs to prevent file system access
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  watch: jest.fn(),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

// Mock StorageManager
jest.mock('../../src/auth/utils/storage-manager', () => ({
  storageManager: {
    loadStorageData: jest.fn(),
    saveStorageData: jest.fn(),
    encrypt: jest.fn(),
    decrypt: jest.fn(),
    storageFile: '/mock/storage/path/storage.json',
  },
}));

// Mock isTokenExpired
jest.mock('../../src/auth/utils/is-token-valid', () => ({
  isTokenExpired: jest.fn(),
}));

import { isTokenExpired } from '../../src/auth/utils/is-token-valid';
import fs from 'fs';

const mockStorageManager = storageManager as jest.Mocked<typeof storageManager>;
const mockIsTokenExpired = isTokenExpired as jest.MockedFunction<typeof isTokenExpired>;
const mockFs = fs as jest.Mocked<typeof fs>;

describe('AuthStore', () => {
  let testAuthStore: AuthStore;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mock implementations
    mockStorageManager.loadStorageData.mockResolvedValue({ tokens: {}, clients: {} });
    mockStorageManager.saveStorageData.mockResolvedValue();
    mockStorageManager.encrypt.mockImplementation((data) => `encrypted:${data}`);
    mockStorageManager.decrypt.mockImplementation((data) => data.replace('encrypted:', ''));

    // Mock fs methods to prevent file system errors
    mockFs.existsSync.mockReturnValue(false);
    mockFs.watch.mockReturnValue({} as any);

    testAuthStore = new AuthStore();
  });

  afterEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
  });

  describe('Expired Token Cleanup', () => {
    it('should handle expired token cleanup and local token management', async () => {
      jest.clearAllMocks();

      const now = Date.now() / 1000;
      const expiredToken: AuthInfo = {
        token: 'expired-token',
        clientId: 'test-client',
        scopes: ['read'],
        expiresAt: now - 8 * 24 * 60 * 60, // Expired 8 days ago
      };

      const validToken: AuthInfo = {
        token: 'valid-token',
        clientId: 'test-client',
        scopes: ['read'],
        expiresAt: now + 3600, // Valid for 1 hour
      };

      const tokenWithoutExpiry: AuthInfo = {
        token: 'no-expiry-token',
        clientId: 'test-client',
        scopes: ['read'],
      };

      mockStorageManager.loadStorageData.mockResolvedValue({
        tokens: {
          'expired-token': expiredToken,
          'valid-token': validToken,
          'no-expiry-token': tokenWithoutExpiry,
        },
        clients: {},
        localTokens: {
          app1: 'expired-token',
          app2: 'valid-token',
        },
      });

      const newAuthStore = new AuthStore();
      await new Promise((resolve) => setTimeout(resolve, 200));

      const testToken: AuthInfo = {
        token: 'test-token',
        clientId: 'test-client',
        scopes: ['read'],
        expiresAt: now + 3600,
      };

      await newAuthStore.storeToken(testToken);

      // Verify cleanup worked
      expect(mockStorageManager.saveStorageData).toHaveBeenCalled();

      const retrievedExpiredToken = await newAuthStore.getToken('expired-token');
      const retrievedValidToken = await newAuthStore.getToken('valid-token');
      const retrievedNoExpiryToken = await newAuthStore.getToken('no-expiry-token');

      expect(retrievedExpiredToken).toBeUndefined();
      expect(retrievedValidToken).toEqual(validToken);
      expect(retrievedNoExpiryToken).toEqual(tokenWithoutExpiry); // Should not be removed
    });

    it('should skip cleanup when no tokens are expired', async () => {
      jest.clearAllMocks();

      const now = Date.now() / 1000;
      const validToken: AuthInfo = {
        token: 'valid-token',
        clientId: 'test-client',
        scopes: ['read'],
        expiresAt: now + 3600,
      };

      mockStorageManager.loadStorageData.mockResolvedValue({
        tokens: { 'valid-token': validToken },
        clients: {},
      });

      const newAuthStore = new AuthStore();
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(mockStorageManager.saveStorageData).not.toHaveBeenCalled();
    });
  });

  describe('Token Management', () => {
    it('should handle complete token lifecycle', async () => {
      const token: AuthInfo = {
        token: 'test-access-token',
        clientId: 'test-client',
        scopes: ['read', 'write'],
        expiresAt: Date.now() / 1000 + 3600,
      };

      // Store token
      const storedToken = await testAuthStore.storeToken(token);
      expect(storedToken).toEqual(token);
      expect(mockStorageManager.saveStorageData).toHaveBeenCalled();

      // Retrieve token
      const retrievedToken = await testAuthStore.getToken(token.token);
      expect(retrievedToken).toEqual(token);

      // Remove token
      await testAuthStore.removeToken(token.token);
      expect(mockStorageManager.saveStorageData).toHaveBeenCalledTimes(2);

      const removedToken = await testAuthStore.getToken(token.token);
      expect(removedToken).toBeUndefined();
    });

    it('should handle refresh token operations', async () => {
      const refreshToken = 'test-refresh-token';
      const token: AuthInfo = {
        token: 'test-access-token',
        clientId: 'test-client',
        scopes: ['read'],
        extra: { refreshToken: refreshToken },
      };

      await testAuthStore.storeToken(token);

      // Retrieve by refresh token
      const retrievedToken = await testAuthStore.getTokenByRefreshToken(refreshToken);
      expect(retrievedToken).toEqual(token);

      // Test non-existent refresh token
      const nonExistentToken = await testAuthStore.getTokenByRefreshToken('non-existent');
      expect(nonExistentToken).toBeUndefined();
    });

    it('should return undefined for non-existent operations', async () => {
      expect(await testAuthStore.getToken('non-existent')).toBeUndefined();
      expect(await testAuthStore.getTokenByRefreshToken('non-existent')).toBeUndefined();
    });
  });

  describe('Local Access Token Management', () => {
    it('should handle local token lifecycle with app management', async () => {
      const accessToken1 = 'token-app1';
      const accessToken2 = 'token-app2';
      const appId1 = 'app1';
      const appId2 = 'app2';

      // Store tokens for different apps
      await testAuthStore.storeLocalAccessToken(accessToken1, appId1);
      await testAuthStore.storeLocalAccessToken(accessToken2, appId2);

      // Verify retrieval
      expect(await testAuthStore.getLocalAccessToken(appId1)).toBe(accessToken1);
      expect(await testAuthStore.getLocalAccessToken(appId2)).toBe(accessToken2);

      // Test get all tokens
      const allTokens = await testAuthStore.getAllLocalAccessTokens();
      expect(allTokens).toEqual({
        [appId1]: accessToken1,
        [appId2]: accessToken2,
      });

      // Remove one app's token
      await testAuthStore.removeLocalAccessToken(appId1);
      expect(await testAuthStore.getLocalAccessToken(appId1)).toBeUndefined();
      expect(await testAuthStore.getLocalAccessToken(appId2)).toBe(accessToken2);

      // Remove all tokens
      await testAuthStore.removeAllLocalAccessTokens();
      const finalTokens = await testAuthStore.getAllLocalAccessTokens();
      expect(finalTokens).toEqual({});
    });

    it('should handle local token removal with associated token cleanup', async () => {
      const accessToken = 'local-access-token';
      const appId = 'test-app-id';

      await testAuthStore.storeLocalAccessToken(accessToken, appId);

      // Store corresponding token in tokens cache
      const token: AuthInfo = {
        token: accessToken,
        clientId: 'test-client',
        scopes: ['read'],
      };
      await testAuthStore.storeToken(token);

      // Remove local access token should also remove associated token
      await testAuthStore.removeLocalAccessToken(appId);

      expect(await testAuthStore.getLocalAccessToken(appId)).toBeUndefined();
      expect(await testAuthStore.getToken(accessToken)).toBeUndefined();
    });

    it('should handle edge cases gracefully', async () => {
      // Non-existent app
      expect(await testAuthStore.getLocalAccessToken('non-existent')).toBeUndefined();

      // Remove non-existent token
      await testAuthStore.removeLocalAccessToken('non-existent');

      // Empty object when localTokens is undefined
      mockStorageManager.loadStorageData.mockResolvedValue({
        tokens: {},
        clients: {},
      });

      const newAuthStore = new AuthStore();
      await new Promise((resolve) => setTimeout(resolve, 10));

      const allTokens = await newAuthStore.getAllLocalAccessTokens();
      expect(allTokens).toEqual({});
    });
  });

  describe('Client Management', () => {
    it('should handle client registration and operations', async () => {
      const client = {
        client_id: 'test-client-id',
        client_secret: 'test-client-secret',
        redirect_uris: ['http://localhost:3000/callback'],
      };

      // Register client
      const registeredClient = await testAuthStore.registerClient(client);
      expect(registeredClient).toEqual(client);
      expect(mockStorageManager.saveStorageData).toHaveBeenCalled();

      // Retrieve client
      const retrievedClient = await testAuthStore.getClient(client.client_id);
      expect(retrievedClient).toEqual(client);

      // Remove client
      await testAuthStore.removeClient(client.client_id);
      expect(mockStorageManager.saveStorageData).toHaveBeenCalledTimes(2);

      const removedClient = await testAuthStore.getClient(client.client_id);
      expect(removedClient).toBeUndefined();
    });

    it('should return undefined for non-existent client', async () => {
      const retrievedClient = await testAuthStore.getClient('non-existent-client');
      expect(retrievedClient).toBeUndefined();
    });
  });

  describe('Code Verifier Management', () => {
    it('should handle code verifier operations', async () => {
      const { codeVerifier: verifier1 } = generatePKCEPair();
      const { codeVerifier: verifier2 } = generatePKCEPair();
      const key1 = 'key1';
      const key2 = 'key2';

      // Store verifiers
      testAuthStore.storeCodeVerifier(key1, verifier1);
      testAuthStore.storeCodeVerifier(key2, verifier2);

      // Retrieve verifiers
      expect(testAuthStore.getCodeVerifier(key1)).toBe(verifier1);
      expect(testAuthStore.getCodeVerifier(key2)).toBe(verifier2);

      // Overwrite existing verifier
      const { codeVerifier: newVerifier } = generatePKCEPair();
      testAuthStore.storeCodeVerifier(key1, newVerifier);
      expect(testAuthStore.getCodeVerifier(key1)).toBe(newVerifier);

      // Remove verifier
      testAuthStore.removeCodeVerifier(key1);
      expect(testAuthStore.getCodeVerifier(key1)).toBeUndefined();

      // Clear all verifiers
      testAuthStore.clearExpiredCodeVerifiers();
      expect(testAuthStore.getCodeVerifier(key2)).toBeUndefined();
    });

    it('should return undefined for non-existent code verifier', async () => {
      const retrievedVerifier = testAuthStore.getCodeVerifier('non-existent');
      expect(retrievedVerifier).toBeUndefined();
    });
  });

  describe('Constructor and Initialization', () => {
    it('should load data from storage on construction', async () => {
      const validToken: AuthInfo = {
        token: 'valid-token',
        clientId: 'test-client',
        scopes: ['read'],
        expiresAt: Date.now() / 1000 + 3600,
      };

      mockStorageManager.loadStorageData.mockResolvedValue({
        tokens: { 'valid-token': validToken },
        clients: {},
        localTokens: { app1: 'valid-token' }, // Use the same token that exists
      });

      const newAuthStore = new AuthStore();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(mockStorageManager.loadStorageData).toHaveBeenCalled();

      const retrievedToken = await newAuthStore.getToken('valid-token');
      expect(retrievedToken).toEqual(validToken);

      const retrievedLocalToken = await newAuthStore.getLocalAccessToken('app1');
      expect(retrievedLocalToken).toBe('valid-token');
    });

    it('should handle initialization errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      mockStorageManager.loadStorageData.mockRejectedValue(new Error('Load failed'));

      const newAuthStore = new AuthStore();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(consoleSpy).toHaveBeenCalledWith('[AuthStore] Failed to initialize: Error: Load failed');
      consoleSpy.mockRestore();
    });

    it('should reuse initialization promise for concurrent calls', async () => {
      mockStorageManager.loadStorageData.mockClear();

      const newAuthStore = new AuthStore();
      await new Promise((resolve) => setTimeout(resolve, 10));

      const promises = [
        newAuthStore.getToken('test'),
        newAuthStore.getLocalAccessToken('test-app').catch(() => undefined),
        newAuthStore.getToken('test2'),
      ];

      await Promise.all(promises);
      expect(mockStorageManager.loadStorageData).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error Handling', () => {
    it('should handle storage errors in core operations', async () => {
      mockStorageManager.saveStorageData.mockRejectedValue(new Error('Storage save failed'));

      const token: AuthInfo = {
        token: 'test-token',
        clientId: 'test-client',
        scopes: ['read'],
      };

      const client = {
        client_id: 'test-client-id',
        client_secret: 'test-client-secret',
        redirect_uris: ['http://localhost:3000/callback'],
      };

      // All operations should fail with the same error
      await expect(testAuthStore.storeToken(token)).rejects.toThrow('Storage save failed');
      await expect(testAuthStore.removeToken('test-token')).rejects.toThrow('Storage save failed');
      await expect(testAuthStore.storeLocalAccessToken('test-token', 'test-app')).rejects.toThrow(
        'Storage save failed',
      );
      await expect(testAuthStore.removeLocalAccessToken('test-app')).rejects.toThrow('Storage save failed');
      await expect(testAuthStore.registerClient(client)).rejects.toThrow('Storage save failed');
      await expect(testAuthStore.removeClient('test-client')).rejects.toThrow('Storage save failed');
    });

    it('should skip saving when initialization failed', async () => {
      mockStorageManager.loadStorageData.mockRejectedValue(new Error('Init error'));

      const newAuthStore = new AuthStore();
      await new Promise((resolve) => setTimeout(resolve, 100));

      const testToken: AuthInfo = {
        token: 'test-token',
        clientId: 'test-client',
        scopes: ['read'],
      };

      // Should not throw, but also should not save to storage
      await newAuthStore.storeToken(testToken);
      expect(mockStorageManager.saveStorageData).not.toHaveBeenCalled();
    });

    it('should handle missing data in clearExpiredTokens', async () => {
      const newAuthStore = new AuthStore();

      // Set invalid cache data
      (newAuthStore as any).storageDataCache = null;
      await (newAuthStore as any).clearExpiredTokens();
      expect(mockStorageManager.saveStorageData).not.toHaveBeenCalled();

      // Set cache without tokens property
      (newAuthStore as any).storageDataCache = { clients: {} };
      await (newAuthStore as any).clearExpiredTokens();
      expect(mockStorageManager.saveStorageData).not.toHaveBeenCalled();
    });
  });

  describe('File Watcher Management', () => {
    it('should handle file watcher lifecycle', async () => {
      const mockWatcher = { close: jest.fn() };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.watch.mockReturnValue(mockWatcher as any);

      const newAuthStore = new AuthStore();
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Should set up file watcher
      expect(mockFs.watch).toHaveBeenCalled();

      // Should close watcher on destroy
      newAuthStore.destroy();
      expect(mockWatcher.close).toHaveBeenCalled();
    });

    it('should handle file watcher errors gracefully', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.watch.mockImplementation(() => {
        throw new Error('File watcher error');
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const newAuthStore = new AuthStore();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(consoleSpy).toHaveBeenCalledWith('[AuthStore] Failed to setup file watcher: Error: File watcher error');
      consoleSpy.mockRestore();

      // Should not throw when no watcher exists
      expect(() => newAuthStore.destroy()).not.toThrow();
    });
  });

  describe('Global authStore instance', () => {
    it('should be properly initialized', () => {
      expect(authStore).toBeInstanceOf(AuthStore);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete token and client lifecycle', async () => {
      const client = {
        client_id: 'integration-client',
        client_secret: 'client-secret',
        redirect_uris: ['http://localhost:3000/callback'],
      };

      const token: AuthInfo = {
        token: 'client-token',
        clientId: client.client_id,
        scopes: ['read'],
      };

      const appId = 'test-app';

      // Complete workflow
      await testAuthStore.registerClient(client);
      await testAuthStore.storeToken(token);
      await testAuthStore.storeLocalAccessToken(token.token, appId);

      // Verify all data
      expect(await testAuthStore.getClient(client.client_id)).toEqual(client);
      expect(await testAuthStore.getToken(token.token)).toEqual(token);
      expect(await testAuthStore.getLocalAccessToken(appId)).toBe(token.token);

      // Cleanup - remove local token should also remove from tokens
      await testAuthStore.removeLocalAccessToken(appId);
      expect(await testAuthStore.getLocalAccessToken(appId)).toBeUndefined();
      expect(await testAuthStore.getToken(token.token)).toBeUndefined();

      // Client should still exist
      expect(await testAuthStore.getClient(client.client_id)).toEqual(client);
    });
  });
});
