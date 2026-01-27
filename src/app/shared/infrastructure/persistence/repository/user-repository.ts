import { InvalidCredentialsError } from '@/app/authentication/application/errors';
import { type UserFinder } from '@/app/authentication/domain/user-finder-interface';
import { type User } from '@/app/shared/domain/entity';

export const findByEmailOrFail: UserFinder = async (email: string): Promise<User> => {
  if ('admin@example.com' !== email) throw InvalidCredentialsError;

  return Promise.resolve({
    id: '1',
    username: 'admin',
    email,
    // eslint-disable-next-line sonarjs/no-hardcoded-passwords
    password: '$argon2id$v=19$m=65536,t=3,p=4$7P3FZGpYmiP/XHQ5FwwRDg$uKY9J6tbSlo5senn16tHzCxfz/gpqi8Ha1O61lISvPw',
  });
};
