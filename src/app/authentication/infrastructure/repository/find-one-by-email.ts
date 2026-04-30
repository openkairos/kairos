import { invalidCredentialsError } from '@/app/authentication/domain/errors';
import { type FindOneByEmail } from '@/app/authentication/domain/user-credentials-repository';
import { err, ok } from '@/app/shared/application/result';
import { type FindUserByEmail } from '@/app/user/domain/user-repository';

interface FindOneByEmailDependencies {
  findUserByEmail: FindUserByEmail;
}

export function createFindOneByEmail({ findUserByEmail }: FindOneByEmailDependencies): FindOneByEmail {
  return async (email: string) => {
    const user = await findUserByEmail(email);
    if (user === null) return err(invalidCredentialsError);

    return ok(user);
  };
}
