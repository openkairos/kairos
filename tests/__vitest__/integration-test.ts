import { mongodbConfig } from '@/config/mongodb';
import { mongoDBClient } from '@/framework/mongodb/client/client';
import { createEnsureIndexes } from '@/framework/mongodb/index/create-ensure-indexes';
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
