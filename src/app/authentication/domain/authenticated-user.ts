import { type AccessToken } from '@/app/authentication/domain/access-token';
import type { User } from '@/app/shared/domain/entity';

export interface AuthenticatedUser {
  user: User;
  token: AccessToken;
}
