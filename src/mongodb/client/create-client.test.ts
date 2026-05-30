import { createClient } from '@/mongodb/client/create-client';
import { type MongoClient } from 'mongodb';
import { describe, expect, it, vi } from 'vitest';

describe('createMongodbClient', () => {
  it('should create a mongodb client with the provided connection string', () => {
    const expectedClient = { id: 'custom-client' } as unknown as MongoClient;
    const makeClient = vi.fn().mockReturnValue(expectedClient);
    const uri = 'mongodb://mongodb:27017/kairos';

    const client = createClient({ uri, makeClient });

    expect(makeClient).toHaveBeenCalledWith(uri);
    expect(client).toBe(expectedClient);
  });
});
