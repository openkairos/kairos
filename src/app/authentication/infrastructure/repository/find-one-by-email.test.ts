import { describe, expect, test, vi } from 'vitest';
import { invalidCredentialsError } from '@/app/authentication/domain/errors';
import { createFindOneByEmail } from '@/app/authentication/infrastructure/repository/find-one-by-email';
import { type User } from '@/app/user/domain/user';
import { type FindUserByEmail } from '@/app/user/domain/user-repository';

describe('Find One By Email Repository', () => {
  test('returns user when user exists by email', async () => {
    const user: User = {
      id: 'user-id',
      username: 'admin',
      email: 'admin@example.com',
      password: '$hashed-password',
      roles: ['ROLE_SUPER_ADMIN'],
    };
    const findUserByEmail: FindUserByEmail = vi.fn().mockResolvedValue(user);
    const findOneByEmail = createFindOneByEmail({ findUserByEmail });

    const result = await findOneByEmail(user.email);

    expect(result).toEqual({
      isOk: true,
      value: user,
    });
  });

  test('returns invalid credentials when no user exists by email', async () => {
    const findUserByEmail: FindUserByEmail = vi.fn().mockResolvedValue(null);
    const findOneByEmail = createFindOneByEmail({ findUserByEmail });

    const result = await findOneByEmail('missing@example.com');

    expect(result).toEqual({
      isOk: false,
      error: invalidCredentialsError,
    });
  });
});
