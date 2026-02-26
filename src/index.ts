import '@/bootstrap';
import { create } from '@koala-ts/framework';
import { appConfig, server } from './config';
import { runStartupRuntime } from '@/composition/setup/startup-runtime';
import { appLogger } from '@/composition/shared/observability/logger';

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
