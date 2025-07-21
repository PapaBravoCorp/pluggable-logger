//  Local Disk Implemntation
import { StorageProvider, LogEntry } from '../storage';
import { appendFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';

export class LocalFsProvider implements StorageProvider {
  constructor(private readonly baseDir: string) {}

  async write(entry: LogEntry): Promise<void> {
    const date = entry.timestamp.slice(0, 10);
    const filePath = join(this.baseDir, `${date}.log`);
    await mkdir(dirname(filePath), { recursive: true });
    const line = JSON.stringify(entry) + '\n';
    await appendFile(filePath, line, 'utf8');
  }
}