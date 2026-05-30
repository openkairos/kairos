import { createExistsSuperAdmin } from '@/kairos/setup/infrastructure/repository/exists-super-admin';

import { usersCollection } from '@/mongodb/collection/users-collection';
import { integrationTest } from '@tests/__vitest__/integration-test';
import { describe, expect, test } from 'vitest';

describe('Exists Super Admin Repository', () => {
  integrationTest();

  test('returns false when super admin does not exist', async () => {
    const existsSuperAdmin = createExistsSuperAdmin({ usersCollection });

    const result = await existsSuperAdmin();

    expect(result).toBe(false);
  });

  test('returns true when super admin exists', async () => {
    await usersCollection.insertOne({
      username: 'admin',
      email: 'admin@example.com',
      password: '$hashed-password',
      roles: ['ROLE_SUPER_ADMIN'],
    });
    const existsSuperAdmin = createExistsSuperAdmin({ usersCollection });

    const result = await existsSuperAdmin();

    expect(result).toBe(true);
  });
});
