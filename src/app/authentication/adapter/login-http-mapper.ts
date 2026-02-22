import {
  type AuthenticatedUser,
  authenticatedUserSerializerMetadata,
} from '@/app/authentication/domain/authenticated-user';
import { type InvalidCredentialsError } from '@/app/authentication/domain/errors';
import { type HttpResponsePayload, type Mapper } from '@/app/shared/adapter/http/map-result-to-http';
import { type MapSuccessToHttp } from '@/app/shared/adapter/http/map-success-to-http';
import { HTTP_OK, HTTP_UNAUTHORIZED } from '@/app/shared/interface/http/status-code';

interface CreateLoginHttpMapperDependencies {
  mapSuccessToHttp: MapSuccessToHttp;
}

export function createLoginHttpMapper({
  mapSuccessToHttp,
}: CreateLoginHttpMapperDependencies): Mapper<AuthenticatedUser, InvalidCredentialsError> {
  const mapLoginSuccessToHttp = (user: AuthenticatedUser): HttpResponsePayload =>
    mapSuccessToHttp(user, HTTP_OK, { groups: ['auth:login'], metadata: authenticatedUserSerializerMetadata });

  const mapLoginErrorToHttp = (error: InvalidCredentialsError): HttpResponsePayload => ({
    status: HTTP_UNAUTHORIZED,
    body: error,
  });

  return {
    onOk: mapLoginSuccessToHttp,
    onErr: mapLoginErrorToHttp,
  };
}
