import { mongodbConfig } from '@/config/mongodb';
import { ensureMongoIndexes } from '@/kairos/shared/persistence/mongodb/ensure-mongo-indexes';
import { mongoDBClient } from '@/kairos/shared/persistence/mongodb/mongodb-composition';
import { afterEach, beforeEach } from 'vitest';

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
