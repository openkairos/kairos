import { InvalidCredentialsError, invalidCredentialsException } from '@/app/authentication/application/errors';
import {
  type FindOneByEmail,
  type FindOneByEmailOrFail,
} from '@/app/authentication/domain/user-credentials-repository';
import { err, isErr, ok } from '@/app/shared/application/util/result';
import { type User } from '@/app/shared/domain/entity';

export const findOneByEmailOrFail: FindOneByEmailOrFail = async (email: string): Promise<User> => {
  const result = await findOneByEmail(email);

  if (isErr(result)) throw InvalidCredentialsError;

  return Promise.resolve(result.value);
};

export const findOneByEmail: FindOneByEmail = async (email: string) => {
  if ('admin@example.com' !== email) return Promise.resolve(err(invalidCredentialsException));

  return Promise.resolve(
    ok({
      id: '1',
      username: 'admin',
      email,
      password: '$argon2id$v=19$m=65536,t=3,p=4$7P3FZGpYmiP/XHQ5FwwRDg$uKY9J6tbSlo5senn16tHzCxfz/gpqi8Ha1O61lISvPw',
    }),
  );
};
