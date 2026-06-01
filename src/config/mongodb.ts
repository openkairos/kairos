import type { MongoIndexConfig } from '@/framework/mongodb/index/create-ensure-indexes';
import { sourcesCollectionName } from '@/framework/mongodb/schema/sources-collection-schema';
import { workspacesCollectionName } from '@/framework/mongodb/schema/workspaces-collection-schema';
import { assertIsNonEmptyString } from '@/kairos/shared/assert/string-assertions';

const connectionString = process.env.MONGODB_CONNECTION_STRING;
assertIsNonEmptyString(connectionString, 'MONGODB_CONNECTION_STRING is not defined in environment variables');

const indexes: readonly MongoIndexConfig[] = [
  {
    collectionName: workspacesCollectionName,
    keys: { slug: 1 },
    options: { unique: true },
  },
  {
    collectionName: sourcesCollectionName,
    keys: { workspace_id: 1, app_identifier: 1 },
    options: { unique: true },
  },
];

export const mongodbConfig = {
  connectionString,
  indexes,
};
