import type { AccessToken, AuthenticatedUser } from '@/authentication';

export type AccessTokenGenerator = (user: AuthenticatedUser) => Promise<AccessToken>;
