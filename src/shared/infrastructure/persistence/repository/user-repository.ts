import { InvalidCredentialsError } from '@/authentication/application/errors';
import { type UserFinder } from '@/authentication/domain/user-finder-interface';
import { type User } from '@/shared/domain';

export const findByEmailOrFail: UserFinder = async (email: string): Promise<User> => {
  if ('admin@example.com' !== email) throw InvalidCredentialsError;

  return Promise.resolve({
    id: '1',
    username: 'admin',
    email,
  });
};
