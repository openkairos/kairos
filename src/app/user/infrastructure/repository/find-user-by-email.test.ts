import { integrationTest } from '@tests/__vitest__/integration-test';
import { describe, expect, it } from 'vitest';
import { usersCollection } from '@/app/shared/infrastructure/persistence/mongodb';
import { createFindUserByEmail } from '@/app/user/infrastructure/repository/find-user-by-email';

describe('Find User By Email Repository', () => {
  integrationTest();

  describe('find user by email', () => {
    it('returns user when credentials record exists', async () => {
      const email = 'admin@example.com';
      await usersCollection.insertOne({
        username: 'admin',
        email,
        password: '$hashed-password',
        roles: ['ROLE_SUPER_ADMIN'],
      });
      const findUserByEmail = createFindUserByEmail({ usersCollection });

      const result = await findUserByEmail(email);

      expect(result).toEqual({
        id: expect.any(String),
        username: 'admin',
        email,
        password: '$hashed-password',
        roles: ['ROLE_SUPER_ADMIN'],
      });
    });

    it('returns null when no user record exists', async () => {
      const findUserByEmail = createFindUserByEmail({ usersCollection });

      const result = await findUserByEmail('missing@example.com');

      expect(result).toBeNull();
    });
  });
});
