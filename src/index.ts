import '@/bootstrap';
import { appLogger } from '@/framework/pino-logger/app-logger';
import { ensureRuntimeInfrastructure, executeSetup } from '@/kairos/setup/setup-composition';
import { create } from '@koala-ts/framework';
import { appConfig, server } from './config';

async function main(): Promise<void> {
  await ensureRuntimeInfrastructure();
  await executeSetup();

  const app = create(appConfig);
  app.listen(server.port);

  appLogger.info(`Server is running on http://localhost:${server.port}`);
}

void main().catch((error: unknown) => {
  appLogger.error('Failed to start application', error);
  process.exit(1);
});
