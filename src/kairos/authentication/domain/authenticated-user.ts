import { type AccessToken, accessTokenSerializerMetadata } from '@/kairos/authentication/domain/access-token';
import { type User, userMetadata } from '@/kairos/authentication/domain/user';

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
