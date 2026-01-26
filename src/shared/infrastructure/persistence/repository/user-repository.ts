import { type UserFinder } from '@/authentication/domain/user-finder-interface';
import { type User } from '@/shared/domain';

export const findByEmail: UserFinder = async (email: string): Promise<User | undefined> => {
  if ('admin@example.com' !== email) return undefined;

  return Promise.resolve({
    id: '1',
    username: 'admin',
    email,
  });
};
