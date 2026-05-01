import { type ExistsSuperAdmin } from '@/modules/system/domain/system-setup-repository';
import { type UsersCollection } from '@/modules/shared/persistence/mongodb/users-collection-schema';

interface ExistsSuperAdminDependencies {
  usersCollection: UsersCollection;
}

const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';

export function createExistsSuperAdmin({ usersCollection }: ExistsSuperAdminDependencies): ExistsSuperAdmin {
  return async () => {
    const superAdmin = await usersCollection.findOne({ roles: ROLE_SUPER_ADMIN });
    return superAdmin !== null;
  };
}
