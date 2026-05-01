import { setupSystem } from '@/app/system/system-composition';
import { mongoDBClient } from '@/app/shared/persistence/mongodb';
import { startupRuntime } from '@/app/system/interface/runtime/startup-runtime';
import { setupConfig } from '@/config/setup';

const executeStartupRuntime = startupRuntime({
  connectMongoDB: () => mongoDBClient.connect(),
  setupSystem,
});

export async function runStartupRuntime(): Promise<void> {
  await executeStartupRuntime(setupConfig);
}
