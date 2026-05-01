import {
  type EnsureSystemSetupCommand,
  type EnsureSystemSetupResult,
} from '@/modules/system/application/ensure-system-setup';

export type StartupRuntimeCommand = Readonly<{
  superAdminUsername: string;
  superAdminEmail: string;
  superAdminPassword: string;
}>;

type StartupRuntimeDependencies = Readonly<{
  connectMongoDB: () => Promise<unknown>;
  setupSystem: (command: EnsureSystemSetupCommand) => Promise<EnsureSystemSetupResult>;
}>;

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
