import { type UsersCollection } from '@/app/shared/infrastructure/persistence/mongodb/users-collection-schema';
import { type FindUserByEmail } from '@/app/user/domain/user-repository';

interface FindUserByEmailDependencies {
  usersCollection: UsersCollection;
}

export function createFindUserByEmail({ usersCollection }: FindUserByEmailDependencies): FindUserByEmail {
  return async (email: string) => {
    const user = await usersCollection.findOne({ email });
    if (user === null) return null;

    return {
      id: user._id.toHexString(),
      username: user.username,
      email: user.email,
      password: user.password,
      roles: user.roles,
    };
  };
}
