//  Interfaces: LogEntry, StorageProvider 
export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  meta?: Record<string, any>;
}

export interface StorageProvider {
  write(entry: LogEntry): Promise<void>;
}