import {
  type AuthenticatedUser,
  authenticatedUserSerializerMetadata,
} from '@/kairos/authentication/domain/authenticated-user';
import { type InvalidCredentialsError } from '@/kairos/authentication/domain/errors';
import { type ResultHttpMapping } from '@/kairos/shared/http/result-to-http';
import { HTTP_OK, HTTP_UNAUTHORIZED } from '@/kairos/shared/http/status-code';

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
