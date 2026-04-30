import { ROLE_SUPER_ADMIN, type User } from '@/app/user/domain/user';
import { type CreateSuperAdmin } from '@/app/setup/domain/super-admin-setup-repository';
import { type UsersCollection } from '@/app/shared/infrastructure/persistence/mongodb/users-collection-schema';

interface CreateSuperAdminDependencies {
  usersCollection: UsersCollection;
}

export function createCreateSuperAdmin({ usersCollection }: CreateSuperAdminDependencies): CreateSuperAdmin {
  return async ({ username, email, password }) => {
    const inserted = await usersCollection.insertOne({
      username,
      email,
      password,
      roles: [ROLE_SUPER_ADMIN],
    });

    const user: User = {
      id: inserted.insertedId.toHexString(),
      username,
      email,
      password,
      roles: [ROLE_SUPER_ADMIN],
    };

    return user;
  };
}
