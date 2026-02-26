import { type Collection, type ObjectId, type OptionalId } from 'mongodb';
import type { User } from '@/app/authentication/domain/user';

export interface UserCollectionSchema extends Omit<User, 'id'> {
  _id: ObjectId;
}

export type UsersCollection = Collection<OptionalId<UserCollectionSchema>>;

export const usersCollectionName = 'users';
