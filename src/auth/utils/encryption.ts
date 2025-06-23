import crypto from 'crypto';
import { AUTH_CONFIG } from '../config';
import { logger } from '../../utils/logger';

export class EncryptionUtil {
  private aesKey: string;

  constructor(aesKey: string) {
    this.aesKey = aesKey;
  }

  encrypt(data: string): string {
    const iv = crypto.randomBytes(AUTH_CONFIG.ENCRYPTION.IV_LENGTH);
    const key = Buffer.from(this.aesKey, 'hex');
    const cipher = crypto.createCipheriv(AUTH_CONFIG.ENCRYPTION.ALGORITHM, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  decrypt(encryptedData: string): string {
    const parts = encryptedData.split(':');
    if (parts.length !== 2) {
      logger.error(`[EncryptionUtil] decrypt: Invalid encrypted data format`);
      throw new Error('Invalid encrypted data format');
    }
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const key = Buffer.from(this.aesKey, 'hex');
    const decipher = crypto.createDecipheriv(AUTH_CONFIG.ENCRYPTION.ALGORITHM, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  static generateKey(): string {
    return crypto.randomBytes(AUTH_CONFIG.ENCRYPTION.KEY_LENGTH).toString('hex');
  }
}
