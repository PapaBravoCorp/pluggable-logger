// Logger Class
import { StorageProvider, LogEntry } from './storage';

export class Logger {
  constructor(private provider: StorageProvider) {}

  private async log(level: LogEntry['level'], message: string, meta?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      meta,
    };
    try {
      await this.provider.write(entry);
    } catch (err) {
      console.error('[Logger][WRITE FAILED]', err);
      console[level.toLowerCase() as 'info' | 'warn' | 'error' | 'debug'](entry);
    }
  }

  info(msg: string, meta?: any)  { return this.log('INFO', msg, meta); }
  warn(msg: string, meta?: any)  { return this.log('WARN', msg, meta); }
  error(msg: string, meta?: any) { return this.log('ERROR', msg, meta); }
  debug(msg: string, meta?: any) { return this.log('DEBUG', msg, meta); }
}