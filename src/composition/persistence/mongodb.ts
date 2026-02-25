import { createMongodbClient } from '@/app/shared/infrastructure/persistence/mongodb/create-mongodb-client';
import { mongodbConfig } from '@/config';

export const mongoDBClient = createMongodbClient({
  uri: mongodbConfig.connectionString,
});
