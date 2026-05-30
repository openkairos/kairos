import { mongoDBClient } from '@/kairos/shared/persistence/mongodb/mongodb-composition';
import { UsersCollection, usersCollectionName } from '@/kairos/shared/persistence/mongodb/users-collection-schema';

export const usersCollection: UsersCollection = mongoDBClient.db().collection(usersCollectionName);
