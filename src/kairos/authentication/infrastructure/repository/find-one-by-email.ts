import { invalidCredentialsError } from '@/kairos/authentication/domain/errors';
import { type FindOneByEmail } from '@/kairos/authentication/domain/user-credentials-repository';
import { err, ok } from '@/kairos/shared/kernel/result';
import { type UsersCollection } from '@/kairos/shared/persistence/mongodb/users-collection-schema';

type CreateFindOneByEmailDependencies = Readonly<{
  usersCollection: UsersCollection;
}>;

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
