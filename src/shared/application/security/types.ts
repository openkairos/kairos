import { type User } from '@/shared/domain/entity/User';

export interface AccessToken {
  token_type: 'Bearer';
  expires_in: number;
  access_token: string;
}

export interface AuthenticatedUser {
  user: User;
  token: AccessToken;
}

export type AccessTokenGenerator = (user: AuthenticatedUser) => Promise<AccessToken>;
