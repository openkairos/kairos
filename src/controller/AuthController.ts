import { type HttpScope, Route } from '@koala-ts/framework';
import { authenticateUser } from '@/app/authentication';
import { authenticatedUserSerializerMetadata } from '@/app/authentication/domain/authenticated-user';
import { LoginRequest, loginRequestConstraints } from '@/app/authentication/interface/login-request';
import { isErr } from '@/app/shared/application/util/result';
import { normalize } from '@/app/shared/infrastructure/serializer';
import { validateRequest } from '@/app/shared/interface/middleware';

export class AuthController {
  @Route({ method: 'POST', path: '/api/v1/login', middleware: [validateRequest(loginRequestConstraints)] })
  async login({ response, request }: HttpScope<LoginRequest>): Promise<void> {
    const result = await authenticateUser(request.body);

    if (isErr(result)) {
      response.status = 401;
      response.body = { message: result.error.message };
      return;
    }

    response.body = {
      data: normalize(result.value, { groups: ['auth:login'], metadata: authenticatedUserSerializerMetadata }),
    };
  }
}
