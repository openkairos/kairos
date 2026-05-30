import { invalidCredentialsError } from '@/kairos/authentication/domain/errors';
import { type FindOneByEmail } from '@/kairos/authentication/domain/user-credentials-repository';
import { type UsersCollection } from '@/framework/mongodb/schema/users-collection-schema';
import { err, ok } from '@/kairos/shared/kernel/result';

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
