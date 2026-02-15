import { type HttpScope, Route } from '@koala-ts/framework';
import { authenticateUser } from '@/app/authentication';
import { AuthenticatedUser, authenticatedUserSerializerMetadata } from '@/app/authentication/domain/authenticated-user';
import { LoginRequest } from '@/app/authentication/interface/login-request';
import { loginValidatorMiddleware } from '@/app/authentication/interface/login-validator-middleware';
import { normalize } from '@/app/shared/infrastructure/serializer';

export class AuthController {
  @Route({ method: 'POST', path: '/api/v1/login', middleware: [loginValidatorMiddleware] })
  async login({ response, request }: HttpScope<LoginRequest>): Promise<void> {
    const user: AuthenticatedUser = await authenticateUser(request.body);

    response.body = {
      data: normalize(user, { groups: ['auth:login'], metadata: authenticatedUserSerializerMetadata }),
    };
  }
}
