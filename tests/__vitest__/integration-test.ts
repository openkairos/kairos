import { mongodbConfig } from '@/config/mongodb';
import { mongoDBClient } from '@/mongodb/client/client';
import { createEnsureIndexes } from '@/mongodb/index/create-ensure-indexes';
import { afterEach, beforeEach } from 'vitest';

export function integrationTest(): void {
  beforeEach(async () => {
    await mongoDBClient.connect();
    await createEnsureIndexes({
      database: mongoDBClient.db(),
      indexes: mongodbConfig.indexes,
    })();
  });

  afterEach(async () => {
    await mongoDBClient.db().dropDatabase();
    await mongoDBClient.close();
  });
}
