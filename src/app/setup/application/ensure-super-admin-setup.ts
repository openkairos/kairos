import {
  type CreateSuperAdmin,
  type ExistsSuperAdmin,
  type SuperAdminCredentials,
} from '@/app/setup/domain/super-admin-setup-repository';
import { ok, type Result } from '@/app/shared/application/result';

interface EnsureSuperAdminSetupDependencies {
  existsSuperAdmin: ExistsSuperAdmin;
  createSuperAdmin: CreateSuperAdmin;
  hashPassword: (plainPassword: string) => Promise<string>;
}

export interface EnsureSuperAdminSetupCommand {
  username: string;
  email: string;
  password: string;
}

export type EnsureSuperAdminSetupResult = Result<{ created: boolean }, never>;

export function ensureSuperAdminSetup({
  existsSuperAdmin,
  createSuperAdmin,
  hashPassword,
}: EnsureSuperAdminSetupDependencies): (command: EnsureSuperAdminSetupCommand) => Promise<EnsureSuperAdminSetupResult> {
  return async (command: EnsureSuperAdminSetupCommand) => {
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
