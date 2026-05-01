import { ROLE_SUPER_ADMIN } from '@/app/authentication/domain/user';
import { type ExistsSuperAdmin } from '@/app/setup/domain/super-admin-setup-repository';
import { type UsersCollection } from '@/app/shared/infrastructure/persistence/mongodb/users-collection-schema';

interface ExistsSuperAdminDependencies {
  usersCollection: UsersCollection;
}

export function createExistsSuperAdmin({ usersCollection }: ExistsSuperAdminDependencies): ExistsSuperAdmin {
  return async () => {
    const superAdmin = await usersCollection.findOne({ roles: ROLE_SUPER_ADMIN });
    return superAdmin !== null;
  };
}
