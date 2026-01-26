import { type AccessToken } from '@/authentication/domain/access-token';
import type { User } from '@/shared/domain/entity/User';

export interface AuthenticatedUser {
  user: User;
  token: AccessToken;
}
