import '@/bootstrap';
import { create } from '@koala-ts/framework';
import { appConfig, server } from './config';
import { runStartupRuntime } from '@/app/system/interface/runtime/run-startup-runtime';
import { appLogger } from '@/app/shared/logger';

async function main(): Promise<void> {
  await runStartupRuntime();
  const app = create(appConfig);

  app.listen(server.port);
  appLogger.info(`Server is running on http://localhost:${server.port}`);
}

void main().catch((error: unknown) => {
  appLogger.error('Failed to start application', error);
  process.exit(1);
});
