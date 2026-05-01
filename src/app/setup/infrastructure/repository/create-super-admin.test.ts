import { integrationTest } from '@tests/__vitest__/integration-test';
import { describe, expect, test } from 'vitest';
import { createCreateSuperAdmin } from '@/app/setup/infrastructure/repository/create-super-admin';
import { usersCollection } from '@/app/shared/infrastructure/persistence/mongodb';

describe('Create Super Admin Repository', () => {
  integrationTest();

  test('creates super admin and returns the created user instance', async () => {
    const createSuperAdmin = createCreateSuperAdmin({ usersCollection });
    const credentials = {
      username: 'admin',
      email: 'admin@example.com',
      password: '$hashed-password',
    };

    const createdUser = await createSuperAdmin(credentials);

    const persistedUser = await usersCollection.findOne({ email: credentials.email });
    expect(createdUser).toEqual({
      id: expect.any(String),
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      roles: ['ROLE_SUPER_ADMIN'],
    });
    expect(persistedUser).toEqual(
      expect.objectContaining({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
        roles: ['ROLE_SUPER_ADMIN'],
      }),
    );
  });
});
