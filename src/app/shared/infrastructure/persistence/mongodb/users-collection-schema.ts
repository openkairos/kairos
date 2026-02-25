import { type Collection, type ObjectId } from 'mongodb';

export interface UserCollectionSchema {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  roles: string[];
}

export type UsersCollection = Collection<UserCollectionSchema>;

export const usersCollectionName = 'users';
