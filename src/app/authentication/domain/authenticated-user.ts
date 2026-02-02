import { type AccessToken, accessTokenMedata } from '@/app/authentication/domain/access-token';
import { type User, userMetadata } from '@/app/shared/domain/entity';

export interface AuthenticatedUser {
  user: User;
  token: AccessToken;
}

export const authenticatedUserMetadata = {
  user: {
    groups: ['auth:login'],
    metadata: userMetadata,
  },
  token: {
    groups: ['auth:login'],
    metadata: accessTokenMedata,
  },
};
