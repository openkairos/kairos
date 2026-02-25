import { type MongoClient } from 'mongodb';
import { describe, expect, it, vi } from 'vitest';
import { createMongodbClient } from '@/app/shared/infrastructure/persistence/mongodb/create-mongodb-client';

describe('createMongodbClient', () => {
  it('should create a mongodb client with the provided connection string', () => {
    const expectedClient = { id: 'custom-client' } as unknown as MongoClient;
    const makeClient = vi.fn().mockReturnValue(expectedClient);

    const client = createMongodbClient({
      uri: 'mongodb://mongodb:27017/kairos',
      makeClient,
    });

    expect(makeClient).toHaveBeenCalledWith('mongodb://mongodb:27017/kairos');
    expect(client).toBe(expectedClient);
  });
});
