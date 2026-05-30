import { createCreateSuperAdmin } from '@/kairos/setup/infrastructure/repository/create-super-admin';

import { usersCollection } from '@/kairos/shared/infrastructure/mongodb/collection/users-collection';
import { integrationTest } from '@tests/__vitest__/integration-test';
import { describe, expect, test } from 'vitest';

describe('Create Super Admin Repository', () => {
  integrationTest();

  test('creates super admin user record', async () => {
    const createSuperAdmin = createCreateSuperAdmin({ usersCollection });
    const credentials = {
      username: 'admin',
      email: 'admin@example.com',
      password: '$hashed-password',
    };

    await createSuperAdmin(credentials);

    const persistedUser = await usersCollection.findOne({ email: credentials.email });
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
