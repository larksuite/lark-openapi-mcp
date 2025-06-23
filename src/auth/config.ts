import { ENV_PATHS } from '../utils/constants';

export const AUTH_CONFIG = {
  SERVER_NAME: 'lark-mcp',
  AES_KEY_NAME: 'encryption-key',
  STORAGE_DIR: ENV_PATHS.data,
  STORAGE_FILE: 'storage.json',
  ENCRYPTION: {
    ALGORITHM: 'aes-256-cbc' as const,
    KEY_LENGTH: 32, // 256 bits
    IV_LENGTH: 16, // 128 bits
  },
} as const;

export type AuthConfig = typeof AUTH_CONFIG;
