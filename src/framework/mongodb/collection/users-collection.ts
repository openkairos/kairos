import { mongoDBClient } from '@/framework/mongodb/client/client';
import { UsersCollection, usersCollectionName } from '@/framework/mongodb/schema/users-collection-schema';

export const usersCollection: UsersCollection = mongoDBClient.db().collection(usersCollectionName);
