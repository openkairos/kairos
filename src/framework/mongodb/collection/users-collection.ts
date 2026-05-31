import { mongoDBClient } from '@/framework/mongodb/client/client';
import type { UsersCollection } from '@/framework/mongodb/schema/users-collection-schema';
import { usersCollectionName } from '@/framework/mongodb/schema/users-collection-schema';

export const usersCollection: UsersCollection = mongoDBClient.db().collection(usersCollectionName);
