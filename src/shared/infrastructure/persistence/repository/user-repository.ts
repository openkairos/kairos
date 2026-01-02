import { type User } from '@/shared/domain';

export async function findByEmail(email: string): Promise<User | undefined> {
  if ('admin@example.com' !== email) return undefined;

  return Promise.resolve({
    id: '1',
    username: 'admin',
    email,
  });
}
