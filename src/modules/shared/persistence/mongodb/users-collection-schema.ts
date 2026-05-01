import { type Collection, type ObjectId, type OptionalId } from 'mongodb';

type UserRoleDocument = 'ROLE_SUPER_ADMIN';

export interface UserCollectionSchema {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  roles: UserRoleDocument[];
}

export type UsersCollection = Collection<OptionalId<UserCollectionSchema>>;

export const usersCollectionName = 'users';
