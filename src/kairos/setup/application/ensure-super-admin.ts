import { type SetupTask } from '@/kairos/setup/application/run-setup';
import {
  type CreateSuperAdmin,
  type ExistsSuperAdmin,
  type SuperAdminCredentials,
} from '@/kairos/setup/domain/super-admin-repository';
import { ok, type Result } from '@/kairos/shared/result/result';

type EnsureSuperAdminDependencies = Readonly<{
  existsSuperAdmin: ExistsSuperAdmin;
  createSuperAdmin: CreateSuperAdmin;
  hashPassword: (plainPassword: string) => Promise<string>;
}>;

export type EnsureSuperAdminCommand = Readonly<{
  username: string;
  email: string;
  password: string;
}>;

export type EnsureSuperAdminResult = Result<{ created: boolean }, never>;

export function createEnsureSuperAdminTask({
  existsSuperAdmin,
  createSuperAdmin,
  hashPassword,
}: EnsureSuperAdminDependencies): (command: EnsureSuperAdminCommand) => SetupTask {
  return (command: EnsureSuperAdminCommand) => async (): Promise<EnsureSuperAdminResult> => {
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
