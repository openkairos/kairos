import { mongodbConfig } from '@/config/mongodb';
import { createMongodbClient } from '@/kairos/shared/persistence/mongodb/create-mongodb-client';
import {
  type WorkspacesCollection,
  workspacesCollectionName,
} from '@/kairos/shared/persistence/mongodb/workspaces-collection-schema';

export const mongoDBClient = createMongodbClient({
  uri: mongodbConfig.connectionString,
});

export const workspacesCollection: WorkspacesCollection = mongoDBClient.db().collection(workspacesCollectionName);
