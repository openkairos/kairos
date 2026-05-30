import { mongoDBClient } from '@/kairos/shared/infrastructure/mongodb/client/client';
import { UsersCollection, usersCollectionName } from '@/kairos/shared/persistence/mongodb/users-collection-schema';

export const usersCollection: UsersCollection = mongoDBClient.db().collection(usersCollectionName);
