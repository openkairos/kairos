import { integrationTest } from '@tests/__vitest__/integration-test';
import { describe, expect, test } from 'vitest';
import { usersCollection } from '@/app/shared/infrastructure/persistence/mongodb';
import { createExistsUserByRole } from '@/app/user/infrastructure/repository/exists-user-by-role';

describe('Exists User By Role Repository', () => {
  integrationTest();

  test('returns false when no user has the role', async () => {
    const existsUserByRole = createExistsUserByRole({ usersCollection });

    const result = await existsUserByRole('ROLE_SUPER_ADMIN');

    expect(result).toBe(false);
  });

  test('returns true when a user has the role', async () => {
    await usersCollection.insertOne({
      username: 'admin',
      email: 'admin@example.com',
      password: '$hashed-password',
      roles: ['ROLE_SUPER_ADMIN'],
    });
    const existsUserByRole = createExistsUserByRole({ usersCollection });

    const result = await existsUserByRole('ROLE_SUPER_ADMIN');

    expect(result).toBe(true);
  });
});
