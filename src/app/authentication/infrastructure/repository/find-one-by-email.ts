import { invalidCredentialsError } from '@/app/authentication/domain/errors';
import { type FindOneByEmail } from '@/app/authentication/domain/user-credentials-repository';
import { err, ok } from '@/app/shared/kernel/result';
import { type UsersCollection } from '@/app/shared/persistence/mongodb/users-collection-schema';

interface CreateFindOneByEmailDependencies {
  usersCollection: UsersCollection;
}

export function createFindOneByEmail({ usersCollection }: CreateFindOneByEmailDependencies): FindOneByEmail {
  return async (email: string) => {
    const user = await usersCollection.findOne({ email });
    if (user === null) return err(invalidCredentialsError);

    return ok({
      id: user._id.toHexString(),
      username: user.username,
      email: user.email,
      password: user.password,
      roles: user.roles,
    });
  };
}
