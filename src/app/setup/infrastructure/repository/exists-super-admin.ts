import { type ExistsSuperAdmin } from '@/app/setup/domain/super-admin-setup-repository';
import { ROLE_SUPER_ADMIN } from '@/app/user/domain/user';
import { type ExistsUserByRole } from '@/app/user/domain/user-repository';

interface ExistsSuperAdminDependencies {
  existsUserByRole: ExistsUserByRole;
}

export function createExistsSuperAdmin({ existsUserByRole }: ExistsSuperAdminDependencies): ExistsSuperAdmin {
  return async () => existsUserByRole(ROLE_SUPER_ADMIN);
}
