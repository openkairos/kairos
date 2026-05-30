import { assertIsNonEmptyString } from '@/modules/shared/kernel/assert';
import { sourcesCollectionName } from '@/modules/shared/persistence/mongodb/sources-collection-schema';
import { workspacesCollectionName } from '@/modules/shared/persistence/mongodb/workspaces-collection-schema';

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
    {
      collectionName: sourcesCollectionName,
      keys: { workspace_id: 1, name: 1, environment: 1 },
      options: { unique: true },
    },
  ],
};
