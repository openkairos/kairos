import { createEnsureIndexes } from '@/kairos/shared/infrastructure/mongodb/index/create-ensure-indexes';
import { describe, expect, test, vi } from 'vitest';

describe('ensureMongoIndexes', () => {
  test('creates configured indexes on their collections', async () => {
    const createIndex = vi.fn().mockResolvedValue('slug_1');
    const database = {
      collection: vi.fn().mockReturnValue({ createIndex }),
    };
    const indexes = [
      {
        collectionName: 'workspaces',
        keys: { slug: 1 },
        options: { unique: true },
      },
    ];

    const ensureIndexes = createEnsureIndexes({ database, indexes });

    await ensureIndexes();

    expect(database.collection).toHaveBeenCalledWith('workspaces');
    expect(createIndex).toHaveBeenCalledWith({ slug: 1 }, { unique: true });
  });
});
