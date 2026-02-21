import { invalidCredentialsError } from '@/app/authentication/application/errors';
import { type FindOneByEmail } from '@/app/authentication/domain/user-credentials-repository';
import { err, ok } from '@/app/shared/application/util/result';

export const findOneByEmail: FindOneByEmail = async (email: string) => {
  if ('admin@example.com' !== email) return Promise.resolve(err(invalidCredentialsError));

  return Promise.resolve(
    ok({
      id: '1',
      username: 'admin',
      email,
      password: '$argon2id$v=19$m=65536,t=3,p=4$7P3FZGpYmiP/XHQ5FwwRDg$uKY9J6tbSlo5senn16tHzCxfz/gpqi8Ha1O61lISvPw',
    }),
  );
};
