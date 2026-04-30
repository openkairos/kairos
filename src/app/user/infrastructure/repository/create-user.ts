import { type UsersCollection } from '@/app/shared/infrastructure/persistence/mongodb/users-collection-schema';
import { type CreateUser } from '@/app/user/domain/user-repository';

interface CreateUserDependencies {
  usersCollection: UsersCollection;
}

export function createCreateUser({ usersCollection }: CreateUserDependencies): CreateUser {
  return async ({ username, email, password, roles }) => {
    const inserted = await usersCollection.insertOne({
      username,
      email,
      password,
      roles,
    });

    return {
      id: inserted.insertedId.toHexString(),
      username,
      email,
      password,
      roles,
    };
  };
}
