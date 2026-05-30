import { assertIsNonEmptyString } from '@/kairos/shared/kernel/assert';
import { workspacesCollectionName } from '@/kairos/shared/persistence/mongodb/workspaces-collection-schema';

const connectionString = process.env.MONGODB_CONNECTION_STRING;
assertIsNonEmptyString(connectionString, 'MONGODB_CONNECTION_STRING is not defined in environment variables');

export const mongodbConfig = {
  connectionString,
  indexes: [
    {
      collectionName: workspacesCollectionName,
      keys: { slug: 1 },
      options: { unique: true },
    },
  ],
};
