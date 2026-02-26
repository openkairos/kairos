import { describe, expect, test, vi } from 'vitest';
import type { User } from '@/app/authentication/domain/user';
import { ensureSuperAdminSetup } from '@/app/setup/application/ensure-super-admin-setup';
import { type CreateSuperAdmin, type ExistsSuperAdmin } from '@/app/setup/domain/super-admin-setup-repository';

describe('ensureSuperAdminSetup', () => {
  test('creates super admin when one does not exist', async () => {
    const existsSuperAdmin: ExistsSuperAdmin = vi.fn().mockResolvedValue(false);
    const createdUser: User = {
      id: 'admin-id',
      username: 'admin',
      email: 'admin@example.com',
      password: '$hashed',
      roles: ['ROLE_SUPER_ADMIN'],
    };
    const createSuperAdmin: CreateSuperAdmin = vi.fn().mockResolvedValue(createdUser);
    const hashPassword = vi.fn().mockResolvedValue('$hashed');
    const execute = ensureSuperAdminSetup({ existsSuperAdmin, createSuperAdmin, hashPassword });
    const command = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'secret',
    };

    const result = await execute(command);

    expect(existsSuperAdmin).toHaveBeenCalledTimes(1);
    expect(hashPassword).toHaveBeenCalledWith('secret');
    expect(createSuperAdmin).toHaveBeenCalledWith({
      username: 'admin',
      email: 'admin@example.com',
      password: '$hashed',
    });
    expect(result).toEqual({ isOk: true, value: { created: true } });
  });

  test('does not create super admin when one already exists', async () => {
    const existsSuperAdmin: ExistsSuperAdmin = vi.fn().mockResolvedValue(true);
    const createSuperAdmin: CreateSuperAdmin = vi.fn();
    const hashPassword = vi.fn();
    const execute = ensureSuperAdminSetup({ existsSuperAdmin, createSuperAdmin, hashPassword });
    const command = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'secret',
    };

    const result = await execute(command);

    expect(existsSuperAdmin).toHaveBeenCalledTimes(1);
    expect(hashPassword).not.toHaveBeenCalled();
    expect(createSuperAdmin).not.toHaveBeenCalled();
    expect(result).toEqual({ isOk: true, value: { created: false } });
  });
});
