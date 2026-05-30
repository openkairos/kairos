import type { CreateIndexesOptions, IndexSpecification } from 'mongodb';
import { sourcesCollectionName } from '@/framework/mongodb/schema/sources-collection-schema';
import { workspacesCollectionName } from '@/framework/mongodb/schema/workspaces-collection-schema';
import { assertIsNonEmptyString } from '@/kairos/shared/assert/string-assertions';

type MongoIndexConfig = Readonly<{
  collectionName: string;
  keys: IndexSpecification;
  options?: CreateIndexesOptions;
}>;

const connectionString = process.env.MONGODB_CONNECTION_STRING;
assertIsNonEmptyString(connectionString, 'MONGODB_CONNECTION_STRING is not defined in environment variables');

export const mongodbConfig: Readonly<{
  connectionString: string;
  indexes: readonly MongoIndexConfig[];
}> = {
  connectionString,
  indexes: [
    {
      collectionName: workspacesCollectionName,
      keys: { slug: 1 },
      options: { unique: true },
    },
    {
      collectionName: sourcesCollectionName,
      keys: { workspace_id: 1, name: 1 },
      options: { unique: true },
    },
  ],
};
