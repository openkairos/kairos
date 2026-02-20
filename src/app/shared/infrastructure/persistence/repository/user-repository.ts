import { InvalidCredentialsError } from '@/app/authentication/application/errors';
import { type User } from '@/app/shared/domain/entity';
import { type FindOneByEmailOrFail } from '@/app/shared/domain/repository/user-repository';

export const findOneByEmailOrFail: FindOneByEmailOrFail = async (email: string): Promise<User> => {
  if ('admin@example.com' !== email) throw InvalidCredentialsError;

  return Promise.resolve({
    id: '1',
    username: 'admin',
    email,
    password: '$argon2id$v=19$m=65536,t=3,p=4$7P3FZGpYmiP/XHQ5FwwRDg$uKY9J6tbSlo5senn16tHzCxfz/gpqi8Ha1O61lISvPw',
  });
};
