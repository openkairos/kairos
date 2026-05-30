import { type ResultHttpMapping } from '@/interface/http/result-to-http';
import { HTTP_OK, HTTP_UNAUTHORIZED } from '@/interface/http/status-code';
import {
  type AuthenticatedUser,
  authenticatedUserSerializerMetadata,
} from '@/kairos/authentication/domain/authenticated-user';
import { type InvalidCredentialsError } from '@/kairos/authentication/domain/errors';

export const loginResponse: ResultHttpMapping<AuthenticatedUser, InvalidCredentialsError> = {
  success: {
    status: HTTP_OK,
    serialize: { groups: ['auth:login'], metadata: authenticatedUserSerializerMetadata },
  },
  error: {
    byType: {
      INVALID_CREDENTIALS: {
        status: HTTP_UNAUTHORIZED,
      },
    },
  },
};
