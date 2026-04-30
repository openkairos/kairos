import { describe, expect, test, vi } from 'vitest';
import { createExistsSuperAdmin } from '@/app/setup/infrastructure/repository/exists-super-admin';
import { type ExistsUserByRole } from '@/app/user/domain/user-repository';

describe('Exists Super Admin Repository', () => {
  test('checks for a user with the super admin role', async () => {
    const existsUserByRole: ExistsUserByRole = vi.fn().mockResolvedValue(true);
    const existsSuperAdmin = createExistsSuperAdmin({ existsUserByRole });

    const result = await existsSuperAdmin();

    expect(result).toBe(true);
    expect(existsUserByRole).toHaveBeenCalledWith('ROLE_SUPER_ADMIN');
  });
});
