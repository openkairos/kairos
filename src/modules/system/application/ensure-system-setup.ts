import {
  type CreateSuperAdmin,
  type ExistsSuperAdmin,
  type SuperAdminCredentials,
} from '@/modules/system/domain/system-setup-repository';
import { ok, type Result } from '@/modules/shared/kernel/result';

type EnsureSystemSetupDependencies = Readonly<{
  existsSuperAdmin: ExistsSuperAdmin;
  createSuperAdmin: CreateSuperAdmin;
  hashPassword: (plainPassword: string) => Promise<string>;
}>;

export type EnsureSystemSetupCommand = Readonly<{
  username: string;
  email: string;
  password: string;
}>;

export type EnsureSystemSetupResult = Result<{ created: boolean }, never>;

export function ensureSystemSetup({
  existsSuperAdmin,
  createSuperAdmin,
  hashPassword,
}: EnsureSystemSetupDependencies): (command: EnsureSystemSetupCommand) => Promise<EnsureSystemSetupResult> {
  return async (command: EnsureSystemSetupCommand) => {
    if (await existsSuperAdmin()) return ok({ created: false });

    const credentials: SuperAdminCredentials = {
      username: command.username,
      email: command.email,
      password: await hashPassword(command.password),
    };

    await createSuperAdmin(credentials);
    return ok({ created: true });
  };
}
