import { mongodbConfig } from '@/config/mongodb';
import { createMongodbClient } from '@/kairos/shared/persistence/mongodb/create-mongodb-client';

export const mongoDBClient = createMongodbClient({
  uri: mongodbConfig.connectionString,
});
