import {
  type EnsureSystemSetupCommand,
  type EnsureSystemSetupResult,
} from '@/modules/system/application/ensure-system-setup';

export interface StartupRuntimeCommand {
  superAdminUsername: string;
  superAdminEmail: string;
  superAdminPassword: string;
}

interface StartupRuntimeDependencies {
  connectMongoDB: () => Promise<unknown>;
  setupSystem: (command: EnsureSystemSetupCommand) => Promise<EnsureSystemSetupResult>;
}

export function startupRuntime({
  connectMongoDB,
  setupSystem,
}: StartupRuntimeDependencies): (command: StartupRuntimeCommand) => Promise<EnsureSystemSetupResult> {
  return async (command: StartupRuntimeCommand) => {
    await connectMongoDB();

    return setupSystem({
      username: command.superAdminUsername,
      email: command.superAdminEmail,
      password: command.superAdminPassword,
    });
  };
}
