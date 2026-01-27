import { type AccessToken } from '@/authentication/domain/access-token';
import { type User } from '@/shared/domain/entity';

export type AccessTokenGenerator = (user: User) => Promise<AccessToken>;
