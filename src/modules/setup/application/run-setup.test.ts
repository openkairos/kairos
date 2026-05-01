import { describe, expect, test, vi } from 'vitest';
import { runSetup } from '@/modules/setup/application/run-setup';

describe('runSetup', () => {
  test('runs setup tasks in order', async () => {
    const calls: string[] = [];
    const ensureSuperAdminExists = vi.fn().mockImplementation(async () => {
      calls.push('ensureSuperAdminExists');
    });
    const ensureFutureSetup = vi.fn().mockImplementation(async () => {
      calls.push('ensureFutureSetup');
    });
    const executeSetup = runSetup([ensureSuperAdminExists, ensureFutureSetup]);

    await executeSetup();

    expect(ensureSuperAdminExists).toHaveBeenCalledTimes(1);
    expect(ensureFutureSetup).toHaveBeenCalledTimes(1);
    expect(calls).toEqual(['ensureSuperAdminExists', 'ensureFutureSetup']);
  });

  test('stops when a setup task fails', async () => {
    const failure = new Error('Setup failed');
    const ensureSuperAdminExists = vi.fn().mockRejectedValue(failure);
    const ensureFutureSetup = vi.fn();
    const executeSetup = runSetup([ensureSuperAdminExists, ensureFutureSetup]);

    const result = executeSetup();

    await expect(result).rejects.toThrow(failure);
    expect(ensureFutureSetup).not.toHaveBeenCalled();
  });
});
