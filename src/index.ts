import '@/bootstrap';
import { create } from '@koala-ts/framework';
import { appConfig, server } from './config';
import { ensureRuntimeInfrastructure, executeSetup } from '@/modules/setup/setup-composition';
import { appLogger } from '@/modules/shared/logger';

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
