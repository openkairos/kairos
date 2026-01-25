import { type User } from '@/shared/domain';

export interface AccessToken {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

export interface AuthenticatedUser {
  user: User;
  token: AccessToken;
}

export interface PasswordHasher {
  hash(plainPassword: string): Promise<string>;

  verify(hashedPassword: string, plainPassword: string): Promise<boolean>;

  needsRehash(hashedPassword: string): boolean;
}

export type AccessTokenGenerator = (user: AuthenticatedUser) => Promise<AccessToken>;
