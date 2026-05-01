import { describe, expect, test, vi } from 'vitest';
import { ensureSystemSetup } from '@/modules/system/application/ensure-system-setup';
import { type CreateSuperAdmin, type ExistsSuperAdmin } from '@/modules/system/domain/system-setup-repository';

describe('ensureSystemSetup', () => {
  test('creates super admin when one does not exist', async () => {
    const existsSuperAdmin: ExistsSuperAdmin = vi.fn().mockResolvedValue(false);
    const createSuperAdmin: CreateSuperAdmin = vi.fn().mockResolvedValue(undefined);
    const hashPassword = vi.fn().mockResolvedValue('$hashed');
    const execute = ensureSystemSetup({ existsSuperAdmin, createSuperAdmin, hashPassword });
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
    const execute = ensureSystemSetup({ existsSuperAdmin, createSuperAdmin, hashPassword });
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
