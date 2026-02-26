import { describe, expect, test, vi } from 'vitest';
import { startupRuntime } from '@/app/shared/infrastructure/runtime/startup-runtime';

describe('startupRuntime', () => {
  test('connects to mongodb and runs super admin setup', async () => {
    const connectMongoDB = vi.fn().mockResolvedValue(undefined);
    const setupSuperAdmin = vi.fn().mockResolvedValue({ isOk: true, value: { created: true } });
    const execute = startupRuntime({ connectMongoDB, setupSuperAdmin });
    const command = {
      superAdminUsername: 'admin',
      superAdminEmail: 'admin@example.com',
      superAdminPassword: 'secret',
    };

    const result = await execute(command);

    expect(connectMongoDB).toHaveBeenCalledTimes(1);
    expect(setupSuperAdmin).toHaveBeenCalledWith({
      username: 'admin',
      email: 'admin@example.com',
      password: 'secret',
    });
    expect(result).toEqual({ isOk: true, value: { created: true } });
  });
});
