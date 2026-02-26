import { afterEach, beforeEach } from 'vitest';
import { mongoDBClient } from '@/composition/shared/persistence/mongodb';

export function integrationTest(): void {
  beforeEach(async () => {
    await mongoDBClient.connect();
  });

  afterEach(async () => {
    await mongoDBClient.db().dropDatabase();
    await mongoDBClient.close();
  });
}
