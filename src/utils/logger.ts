import fs from 'fs';
import path from 'path';
import { ENV_PATHS } from './constants';
import { currentVersion } from './version';

export enum LogLevel {
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
}

export class Logger {
  private level: LogLevel = LogLevel.WARN;

  static logFilesToKeep = 7;

  static logFilePrefix = 'lark-mcp-';

  constructor() {
    this.initLogFile();
    this.cleanHistoryLogFile();
  }

  get logFileName() {
    return `${Logger.logFilePrefix}${new Date().toISOString().split('T')[0]}.log`;
  }

  initLogFile = () => {
    if (!fs.existsSync(ENV_PATHS.log)) {
      fs.mkdirSync(ENV_PATHS.log, { recursive: true });
    }
  };

  cleanHistoryLogFile = () => {
    try {
      // clean old log files, 7 days ago
      const logFiles = fs
        .readdirSync(ENV_PATHS.log)
        .filter((file) => file.startsWith(Logger.logFilePrefix) && file.endsWith('.log'));
      const logFilesToDelete = logFiles.filter((file) => {
        const fileDate = file.split('-')[1].split('.')[0];
        const fileDateObj = new Date(fileDate);
        return fileDateObj < new Date(Date.now() - Logger.logFilesToKeep * 24 * 60 * 60 * 1000);
      });
      for (const file of logFilesToDelete) {
        try {
          fs.unlinkSync(path.join(ENV_PATHS.log, file));
        } catch (error) {
          console.error(`Failed to delete log file: ${error}`);
        }
      }
    } catch (error) {
      console.error(`Failed to clean history log file: ${error}`);
    }
  };

  setLevel = (level: LogLevel) => {
    this.level = level;
  };

  log = (message: string) => {
    try {
      fs.appendFileSync(
        path.join(ENV_PATHS.log, this.logFileName),
        `[${new Date().toISOString()}] [${currentVersion}] [${process.pid}] ${message}\n`,
      );
    } catch (error) {
      console.error(`Failed to write log: ${error} ${message}`);
    }
  };

  debug = (message: string) => {
    if (this.level < LogLevel.DEBUG) {
      return;
    }
    this.log(`[DEBUG] ${message}`);
  };

  info = (message: string) => {
    if (this.level < LogLevel.INFO) {
      return;
    }
    this.log(`[INFO] ${message}`);
  };

  warn = (message: string) => {
    if (this.level < LogLevel.WARN) {
      return;
    }
    this.log(`[WARN] ${message}`);
  };

  error = (message: string) => {
    if (this.level < LogLevel.ERROR) {
      return;
    }
    console.error(message);
    this.log(`[ERROR]  ${message}`);
  };
}

export const logger = new Logger();
