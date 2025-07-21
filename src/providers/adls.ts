//  Azure Data Lake Storage Provider Implementation
import { StorageProvider, LogEntry } from '../storage';
import {
  DataLakeServiceClient,
  DataLakeFileSystemClient,
} from '@azure/storage-file-datalake';
import { Buffer } from 'buffer';

export class AdlsProvider implements StorageProvider {
  private readonly fileSystemClient: DataLakeFileSystemClient;

  constructor(
    accountUrl: string,
    credential: any,
    private readonly container: string
  ) {
    const svc = new DataLakeServiceClient(accountUrl, credential);
    this.fileSystemClient = svc.getFileSystemClient(container);
  }

  async write(entry: LogEntry): Promise<void> {
    const date = entry.timestamp.slice(0, 10);
    const path = `logs/${date}.log`;
    const fileClient = this.fileSystemClient.getFileClient(path);

    if (!(await fileClient.exists())) {
      await fileClient.create();
    }
    const data = JSON.stringify(entry) + '\n';
    const offset = (await fileClient.getProperties()).contentLength ?? 0;
    await fileClient.append(data, offset, Buffer.byteLength(data));
    await fileClient.flush(offset + Buffer.byteLength(data));
  }
}