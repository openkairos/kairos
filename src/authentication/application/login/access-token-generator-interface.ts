import { type AccessToken } from '@/authentication/domain/access-token';
import { type User } from '@/shared/domain/entity/User';

export type AccessTokenGenerator = (user: User) => Promise<AccessToken>;
