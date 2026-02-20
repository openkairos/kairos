import { type HttpScope, Route } from '@koala-ts/framework';
import { authenticateUser } from '@/app/authentication';
import { AuthenticatedUser, authenticatedUserSerializerMetadata } from '@/app/authentication/domain/authenticated-user';
import { LoginRequest, loginRequestConstraints } from '@/app/authentication/interface/login-request';
import { normalize } from '@/app/shared/infrastructure/serializer';
import { validate } from '@/app/shared/interface/middleware';

export class AuthController {
  @Route({ method: 'POST', path: '/api/v1/login', middleware: [validate(loginRequestConstraints)] })
  async login({ response, request }: HttpScope<LoginRequest>): Promise<void> {
    const user: AuthenticatedUser = await authenticateUser(request.body);

    response.body = {
      data: normalize(user, { groups: ['auth:login'], metadata: authenticatedUserSerializerMetadata }),
    };
  }
}
