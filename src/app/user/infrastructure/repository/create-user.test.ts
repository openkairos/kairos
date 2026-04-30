import { integrationTest } from '@tests/__vitest__/integration-test';
import { describe, expect, test } from 'vitest';
import { usersCollection } from '@/app/shared/infrastructure/persistence/mongodb';
import { createCreateUser } from '@/app/user/infrastructure/repository/create-user';

describe('Create User Repository', () => {
  integrationTest();

  test('creates user and returns the created user instance', async () => {
    const createUser = createCreateUser({ usersCollection });
    const command = {
      username: 'admin',
      email: 'admin@example.com',
      password: '$hashed-password',
      roles: ['ROLE_SUPER_ADMIN' as const],
    };

    const createdUser = await createUser(command);

    const persistedUser = await usersCollection.findOne({ email: command.email });
    expect(createdUser).toEqual({
      id: expect.any(String),
      username: command.username,
      email: command.email,
      password: command.password,
      roles: command.roles,
    });
    expect(persistedUser).toEqual(
      expect.objectContaining({
        username: command.username,
        email: command.email,
        password: command.password,
        roles: command.roles,
      }),
    );
  });
});
