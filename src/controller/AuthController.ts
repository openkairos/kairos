import { type HttpScope, Route } from '@koala-ts/framework';
import { loginUseCase } from '@/app/authentication';
import { AuthenticatedUser, authenticatedUserMetadata } from '@/app/authentication/domain/authenticated-user';
import { LoginRequest } from '@/app/authentication/interface/login-request';
import { normalize } from '@/app/shared/infrastructure/serializer';

export class AuthController {
  @Route({ method: 'POST', path: '/api/v1/login' })
  async login({ response, request }: HttpScope<LoginRequest>): Promise<void> {
    const user: AuthenticatedUser = await loginUseCase.execute(request.body);

    response.body = {
      data: normalize(user, { groups: ['auth:login'], metadata: authenticatedUserMetadata }),
    };
  }
}
