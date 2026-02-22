import {
  type AuthenticatedUser,
  authenticatedUserSerializerMetadata,
} from '@/app/authentication/domain/authenticated-user';
import { type InvalidCredentialsError } from '@/app/authentication/domain/errors';
import { type HttpResponsePayload } from '@/app/shared/adapter/http/map-result-to-http';
import { normalize } from '@/app/shared/infrastructure/serializer';
import { HTTP_OK, HTTP_UNAUTHORIZED } from '@/app/shared/interface/http/status-code';

const mapLoginSuccessToHttp = (user: AuthenticatedUser): HttpResponsePayload => ({
  status: HTTP_OK,
  body: { data: normalize(user, { groups: ['auth:login'], metadata: authenticatedUserSerializerMetadata }) },
});

const mapLoginErrorToHttp = (error: InvalidCredentialsError): HttpResponsePayload => ({
  status: HTTP_UNAUTHORIZED,
  body: { message: error.message },
});

export const loginHttpMapper = {
  onOk: mapLoginSuccessToHttp,
  onErr: mapLoginErrorToHttp,
};
