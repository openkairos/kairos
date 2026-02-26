import { createMongodbClient } from '@/app/shared/infrastructure/persistence/mongodb/create-mongodb-client';
import {
  usersCollectionName,
  type UsersCollection,
} from '@/app/shared/infrastructure/persistence/mongodb/users-collection-schema';
import { mongodbConfig } from '@/config/mongodb';

export const mongoDBClient = createMongodbClient({
  uri: mongodbConfig.connectionString,
});

export const usersCollection: UsersCollection = mongoDBClient.db().collection(usersCollectionName);
