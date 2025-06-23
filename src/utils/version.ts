import * as fs from 'fs';
import * as path from 'path';
import { safeJsonParse } from './safe-json-parse';

function getPackageJsonVersion() {
  const filePath = path.join(__dirname, '../../package.json');
  try {
    const packageJson = safeJsonParse(fs.readFileSync(filePath, 'utf8'), {
      version: '0.0.0',
    });
    return packageJson.version || '0.0.0';
  } catch (error) {
    return '0.0.0';
  }
}

export const currentVersion = getPackageJsonVersion();
