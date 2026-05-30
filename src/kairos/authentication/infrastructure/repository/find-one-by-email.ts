import { type UsersCollection } from '@/framework/mongodb/schema/users-collection-schema';
import { invalidCredentialsError } from '@/kairos/authentication/domain/errors';
import { type FindOneByEmail } from '@/kairos/authentication/domain/user-credentials-repository';
import { err } from '@/kairos/shared/result/err';
import { ok } from '@/kairos/shared/result/ok';

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
