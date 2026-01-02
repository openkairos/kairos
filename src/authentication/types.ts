import { type HttpRequest } from '@koala-ts/framework';
import { type User } from '@/shared/domain';

export interface UserRepository {
  findByEmail(email: string): Promise<User | undefined>;
}

export interface PasswordCredentials {
  email: string;
  password: string;
}

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

export interface LoginRequest extends HttpRequest {
  body: {
    email: string;
    password: string;
  };
}
