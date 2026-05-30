import { mongodbConfig } from '@/config/mongodb';
import { mongoDBClient } from '@/kairos/shared/infrastructure/mongodb/client/client';
import { ensureMongoIndexes } from '@/kairos/shared/persistence/mongodb/ensure-mongo-indexes';
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
