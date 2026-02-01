import { type HttpScope, Route } from '@koala-ts/framework';
import { loginUseCase } from '@/app/authentication';
import { AuthenticatedUser } from '@/app/authentication/domain/authenticated-user';
import { LoginRequest } from '@/app/authentication/interface/login-request';
import { userMetadata } from '@/app/shared/domain/entity';
import { normalize } from '@/app/shared/infrastructure/serializer';

export class AuthController {
  @Route({ method: 'POST', path: '/api/v1/login' })
  async login({ response, request }: HttpScope<LoginRequest>): Promise<void> {
    const authenticatedUser: AuthenticatedUser = await loginUseCase.execute(request.body);

    const data = {
      user: normalize(authenticatedUser.user, { metadata: userMetadata }),
      token: normalize(authenticatedUser.token),
    };

    response.body = { data };
  }
}
