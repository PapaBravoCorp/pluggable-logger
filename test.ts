import { Logger, LocalFsProvider } from './dist';

(async () => {
  const logger = new Logger(new LocalFsProvider('./logs-ts'));
  await logger.debug('Debugging from TS');
  console.log('✅ TS log written');
})();
