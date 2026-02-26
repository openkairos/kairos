import { integrationTest } from '@tests/__vitest__/integration-test';
import { describe, expect, it } from 'vitest';
import { invalidCredentialsError } from '@/app/authentication/domain/errors';
import { createFindOneByEmail } from '@/app/shared/infrastructure/persistence/repository/user-repository/find-one-by-email';
import { usersCollection } from '@/composition/persistence/mongodb';

describe('Find One By Email Repository', () => {
  integrationTest();

  describe('find one by email', () => {
    it('returns user when credentials record exists', async () => {
      const email = 'admin@example.com';
      await usersCollection.insertOne({
        username: 'admin',
        email,
        password: '$hashed-password',
        roles: ['ROLE_SUPER_ADMIN'],
      });
      const findOneByEmail = createFindOneByEmail({ usersCollection });

      const result = await findOneByEmail(email);

      expect(result).toEqual({
        isOk: true,
        value: {
          id: expect.any(String),
          username: 'admin',
          email,
          password: '$hashed-password',
        },
      });
    });

    it('returns invalid credentials when no user record exists', async () => {
      const findOneByEmail = createFindOneByEmail({ usersCollection });

      const result = await findOneByEmail('missing@example.com');

      expect(result).toEqual({
        isOk: false,
        error: invalidCredentialsError,
      });
    });
  });
});
