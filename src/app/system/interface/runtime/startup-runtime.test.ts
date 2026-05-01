import { describe, expect, test, vi } from 'vitest';
import { startupRuntime } from '@/app/system/interface/runtime/startup-runtime';

describe('startupRuntime', () => {
  test('connects to mongodb and runs super admin setup', async () => {
    const connectMongoDB = vi.fn().mockResolvedValue(undefined);
    const setupSystem = vi.fn().mockResolvedValue({ isOk: true, value: { created: true } });
    const execute = startupRuntime({ connectMongoDB, setupSystem });
    const command = {
      superAdminUsername: 'admin',
      superAdminEmail: 'admin@example.com',
      superAdminPassword: 'secret',
    };

    const result = await execute(command);

    expect(connectMongoDB).toHaveBeenCalledTimes(1);
    expect(setupSystem).toHaveBeenCalledWith({
      username: 'admin',
      email: 'admin@example.com',
      password: 'secret',
    });
    expect(result).toEqual({ isOk: true, value: { created: true } });
  });
});
