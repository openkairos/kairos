import { startupRuntime } from '@/app/setup/application/startup-runtime';
import { setupSuperAdmin } from '@/composition/setup/super-admin-setup';
import { mongoDBClient } from '@/composition/shared/persistence/mongodb';
import { setupConfig } from '@/config/setup';

const executeStartupRuntime = startupRuntime({
  connectMongoDB: () => mongoDBClient.connect(),
  setupSuperAdmin,
});

export async function runStartupRuntime(): Promise<void> {
  await executeStartupRuntime(setupConfig);
}
