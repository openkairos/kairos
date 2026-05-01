import { setupSystem } from '@/modules/system/system-composition';
import { mongoDBClient } from '@/modules/shared/persistence/mongodb';
import { startupRuntime } from '@/modules/system/interface/runtime/startup-runtime';
import { setupConfig } from '@/config/setup';

const executeStartupRuntime = startupRuntime({
  connectMongoDB: () => mongoDBClient.connect(),
  setupSystem,
});

export async function runStartupRuntime(): Promise<void> {
  await executeStartupRuntime(setupConfig);
}
