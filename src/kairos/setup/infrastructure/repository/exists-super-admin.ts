import { type ExistsSuperAdmin } from '@/kairos/setup/domain/super-admin-repository';
import { type UsersCollection } from '@/mongodb/schema/users-collection-schema';

type ExistsSuperAdminDependencies = Readonly<{
  usersCollection: UsersCollection;
}>;

const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';

export function createExistsSuperAdmin({ usersCollection }: ExistsSuperAdminDependencies): ExistsSuperAdmin {
  return async () => {
    const superAdmin = await usersCollection.findOne({ roles: ROLE_SUPER_ADMIN });
    return superAdmin !== null;
  };
}
