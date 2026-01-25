import { type HttpRequest } from '@koala-ts/framework';
import { type User } from '@/shared/domain';

export interface UserRepository {
  findByEmail(email: string): Promise<User | undefined>;
}

export interface PasswordCredentials {
  email: string;
  password: string;
}

export interface LoginRequest extends HttpRequest {
  body: {
    email: string;
    password: string;
  };
}
