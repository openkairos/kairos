import { afterEach, beforeEach } from 'vitest';
import { mongodbConfig } from '@/config/mongodb';
import { ensureMongoIndexes, mongoDBClient } from '@/modules/shared/persistence/mongodb';

export function integrationTest(): void {
  beforeEach(async () => {
    await mongoDBClient.connect();
    await ensureMongoIndexes({
      database: mongoDBClient.db(),
      indexes: mongodbConfig.indexes,
    })();
  });

  afterEach(async () => {
    await mongoDBClient.db().dropDatabase();
    await mongoDBClient.close();
  });
}
