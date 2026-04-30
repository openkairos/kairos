import { createMongodbClient } from '@/app/shared/infrastructure/persistence/mongodb/create-mongodb-client';
import {
  type UsersCollection,
  usersCollectionName,
} from '@/app/shared/infrastructure/persistence/mongodb/users-collection-schema';
import {
  type WorkspacesCollection,
  workspacesCollectionName,
} from '@/app/shared/infrastructure/persistence/mongodb/workspaces-collection-schema';
import { mongodbConfig } from '@/config/mongodb';

export const mongoDBClient = createMongodbClient({
  uri: mongodbConfig.connectionString,
});

export const usersCollection: UsersCollection = mongoDBClient.db().collection(usersCollectionName);

export const workspacesCollection: WorkspacesCollection = mongoDBClient.db().collection(workspacesCollectionName);
