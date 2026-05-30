import { mongoDBClient } from '@/mongodb/client/client';
import { UsersCollection, usersCollectionName } from '@/mongodb/schema/users-collection-schema';

export const usersCollection: UsersCollection = mongoDBClient.db().collection(usersCollectionName);
