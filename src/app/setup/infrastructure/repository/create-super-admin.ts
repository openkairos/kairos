import { type CreateSuperAdmin } from '@/app/setup/domain/super-admin-setup-repository';
import { ROLE_SUPER_ADMIN } from '@/app/user/domain/user';
import { type CreateUser } from '@/app/user/domain/user-repository';

interface CreateSuperAdminDependencies {
  createUser: CreateUser;
}

export function createCreateSuperAdmin({ createUser }: CreateSuperAdminDependencies): CreateSuperAdmin {
  return async ({ username, email, password }) =>
    createUser({
      username,
      email,
      password,
      roles: [ROLE_SUPER_ADMIN],
    });
}
