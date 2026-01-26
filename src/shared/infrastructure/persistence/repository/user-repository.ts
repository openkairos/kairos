import { InvalidCredentialsError } from '@/authentication/application/errors';
import { type UserFinder } from '@/authentication/domain/user-finder-interface';
import { type User } from '@/shared/domain/entity/User';

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
