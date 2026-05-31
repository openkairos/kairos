import { describe, expect, test, vi } from 'vitest';
import { createEnsureSuperAdminTask } from '@/kairos/setup/application/ensure-super-admin';
import type { CreateSuperAdmin, ExistsSuperAdmin } from '@/kairos/setup/domain/super-admin-repository';

describe('createEnsureSuperAdminTask', () => {
  test('creates super admin when one does not exist', async () => {
    const existsSuperAdmin: ExistsSuperAdmin = vi.fn().mockResolvedValue(false);
    const createSuperAdmin: CreateSuperAdmin = vi.fn().mockResolvedValue(undefined);
    const hashPassword = vi.fn().mockResolvedValue('$hashed');
    const createSetupTask = createEnsureSuperAdminTask({ existsSuperAdmin, createSuperAdmin, hashPassword });
    const command = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'secret',
    };

    const result = await createSetupTask(command)();

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
    const createSetupTask = createEnsureSuperAdminTask({ existsSuperAdmin, createSuperAdmin, hashPassword });
    const command = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'secret',
    };

    const result = await createSetupTask(command)();

    expect(existsSuperAdmin).toHaveBeenCalledTimes(1);
    expect(hashPassword).not.toHaveBeenCalled();
    expect(createSuperAdmin).not.toHaveBeenCalled();
    expect(result).toEqual({ isOk: true, value: { created: false } });
  });
});
