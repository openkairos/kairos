import { integrationTest } from '@tests/__vitest__/integration-test';
import { describe, expect, test } from 'vitest';
import { createExistsSuperAdmin } from '@/modules/setup/infrastructure/repository/exists-super-admin';
import { usersCollection } from '@/modules/shared/persistence/mongodb';

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
