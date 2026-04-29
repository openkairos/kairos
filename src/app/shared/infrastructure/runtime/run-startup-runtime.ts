import { setupSuperAdmin } from '@/app/setup/setup-composition';
import { mongoDBClient } from '@/app/shared/infrastructure/persistence/mongodb';
import { startupRuntime } from '@/app/shared/infrastructure/runtime/startup-runtime';
import { setupConfig } from '@/config/setup';

const executeStartupRuntime = startupRuntime({
  connectMongoDB: () => mongoDBClient.connect(),
  setupSuperAdmin,
});

export async function runStartupRuntime(): Promise<void> {
  await executeStartupRuntime(setupConfig);
}
