import { type CreateSuperAdmin } from '@/kairos/setup/domain/super-admin-repository';
import { type UsersCollection } from '@/framework/mongodb/schema/users-collection-schema';

type CreateSuperAdminDependencies = Readonly<{
  usersCollection: UsersCollection;
}>;

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
