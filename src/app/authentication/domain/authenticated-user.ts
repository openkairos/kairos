import { type AccessToken, accessTokenSerializerMetadata } from '@/app/authentication/domain/access-token';
import { type User, userMetadata } from '@/app/authentication/domain/user';

export interface AuthenticatedUser {
  user: User;
  token: AccessToken;
}

export const authenticatedUserSerializerMetadata = {
  user: {
    groups: ['auth:login'],
    metadata: userMetadata,
  },
  token: {
    groups: ['auth:login'],
    metadata: accessTokenSerializerMetadata,
  },
};
