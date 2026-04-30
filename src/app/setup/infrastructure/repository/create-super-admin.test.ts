import { describe, expect, test, vi } from 'vitest';
import { createCreateSuperAdmin } from '@/app/setup/infrastructure/repository/create-super-admin';
import { type User } from '@/app/user/domain/user';
import { type CreateUser } from '@/app/user/domain/user-repository';

describe('Create Super Admin Repository', () => {
  test('creates user with the super admin role', async () => {
    const createdUser: User = {
      id: 'user-id',
      username: 'admin',
      email: 'admin@example.com',
      password: '$hashed-password',
      roles: ['ROLE_SUPER_ADMIN'],
    };
    const createUser: CreateUser = vi.fn().mockResolvedValue(createdUser);
    const createSuperAdmin = createCreateSuperAdmin({ createUser });
    const credentials = {
      username: 'admin',
      email: 'admin@example.com',
      password: '$hashed-password',
    };

    const result = await createSuperAdmin(credentials);

    expect(result).toBe(createdUser);
    expect(createUser).toHaveBeenCalledWith({
      ...credentials,
      roles: ['ROLE_SUPER_ADMIN'],
    });
  });
});
