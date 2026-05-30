import { mongodbConfig } from '@/config/mongodb';
import { createClient } from '@/framework/mongodb/client/create-client';

export const mongoDBClient = createClient({
  uri: mongodbConfig.connectionString,
});
