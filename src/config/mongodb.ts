import { assertIsNonEmptyString } from '@/modules/shared/kernel/assert';

const connectionString = process.env.MONGODB_CONNECTION_STRING;
assertIsNonEmptyString(connectionString, 'MONGODB_CONNECTION_STRING is not defined in environment variables');

export const mongodbConfig = {
  connectionString,
  indexes: [
    {
      collectionName: 'workspaces',
      keys: { slug: 1 },
      options: { unique: true },
    },
  ],
};
