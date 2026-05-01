import { type CreateSuperAdmin } from '@/app/system/domain/system-setup-repository';
import { type UsersCollection } from '@/app/shared/persistence/mongodb/users-collection-schema';

interface CreateSuperAdminDependencies {
  usersCollection: UsersCollection;
}

const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';

export function createCreateSuperAdmin({ usersCollection }: CreateSuperAdminDependencies): CreateSuperAdmin {
  return async ({ username, email, password }) => {
    await usersCollection.insertOne({
      username,
      email,
      password,
      roles: [ROLE_SUPER_ADMIN],
    });
  };
}
