import { mongodbConfig } from '@/config/mongodb';
import { createClient } from '@/kairos/shared/infrastructure/mongodb/client/create-client';

export const mongoDBClient = createClient({
  uri: mongodbConfig.connectionString,
});
