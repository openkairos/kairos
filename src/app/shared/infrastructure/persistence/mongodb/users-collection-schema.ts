import { type Collection, type ObjectId, type OptionalId } from 'mongodb';

export interface UserCollectionSchema {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  roles: string[];
}

export type UsersCollection = Collection<OptionalId<UserCollectionSchema>>;

export const usersCollectionName = 'users';
