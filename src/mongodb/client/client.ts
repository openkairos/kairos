import { mongodbConfig } from '@/config/mongodb';
import { createClient } from '@/mongodb/client/create-client';

export const mongoDBClient = createClient({
  uri: mongodbConfig.connectionString,
});
