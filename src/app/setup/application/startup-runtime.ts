import {
  type EnsureSuperAdminSetupCommand,
  type EnsureSuperAdminSetupResult,
} from '@/app/setup/application/ensure-super-admin-setup';

export interface StartupRuntimeCommand {
  superAdminUsername: string;
  superAdminEmail: string;
  superAdminPassword: string;
}

interface StartupRuntimeDependencies {
  connectMongoDB: () => Promise<unknown>;
  setupSuperAdmin: (command: EnsureSuperAdminSetupCommand) => Promise<EnsureSuperAdminSetupResult>;
}

export function startupRuntime({
  connectMongoDB,
  setupSuperAdmin,
}: StartupRuntimeDependencies): (command: StartupRuntimeCommand) => Promise<EnsureSuperAdminSetupResult> {
  return async (command: StartupRuntimeCommand) => {
    await connectMongoDB();

    return setupSuperAdmin({
      username: command.superAdminUsername,
      email: command.superAdminEmail,
      password: command.superAdminPassword,
    });
  };
}
