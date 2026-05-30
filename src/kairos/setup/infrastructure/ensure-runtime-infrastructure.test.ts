import { describe, expect, test, vi } from 'vitest';
import { createEnsureRuntimeInfrastructure } from '@/kairos/setup/infrastructure/ensure-runtime-infrastructure';

describe('createEnsureRuntimeInfrastructure', () => {
  test('runs runtime infrastructure tasks in order', async () => {
    const calls: string[] = [];
    const connectMongoDB = vi.fn().mockImplementation(async () => {
      calls.push('connectMongoDB');
    });
    const ensureMongoIndexes = vi.fn().mockImplementation(async () => {
      calls.push('ensureMongoIndexes');
    });
    const ensureRuntimeInfrastructure = createEnsureRuntimeInfrastructure([connectMongoDB, ensureMongoIndexes]);

    await ensureRuntimeInfrastructure();

    expect(connectMongoDB).toHaveBeenCalledTimes(1);
    expect(ensureMongoIndexes).toHaveBeenCalledTimes(1);
    expect(calls).toEqual(['connectMongoDB', 'ensureMongoIndexes']);
  });

  test('stops when a runtime infrastructure task fails', async () => {
    const failure = new Error('MongoDB connection failed');
    const connectMongoDB = vi.fn().mockRejectedValue(failure);
    const ensureMongoIndexes = vi.fn();
    const ensureRuntimeInfrastructure = createEnsureRuntimeInfrastructure([connectMongoDB, ensureMongoIndexes]);

    const result = ensureRuntimeInfrastructure();

    await expect(result).rejects.toThrow(failure);
    expect(ensureMongoIndexes).not.toHaveBeenCalled();
  });
});
