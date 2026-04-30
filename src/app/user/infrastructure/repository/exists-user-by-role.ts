import { type UsersCollection } from '@/app/shared/infrastructure/persistence/mongodb/users-collection-schema';
import { type ExistsUserByRole } from '@/app/user/domain/user-repository';

interface ExistsUserByRoleDependencies {
  usersCollection: UsersCollection;
}

export function createExistsUserByRole({ usersCollection }: ExistsUserByRoleDependencies): ExistsUserByRole {
  return async role => {
    const user = await usersCollection.findOne({ roles: role });
    return user !== null;
  };
}
