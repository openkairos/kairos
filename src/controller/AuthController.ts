import { type HttpScope, Route } from '@koala-ts/framework';
import { loginUseCase } from '@/authentication';
import { LoginRequest } from '@/authentication/types';

export class AuthController {
  @Route({ method: 'POST', path: '/api/v1/login' })
  async login({ response, request }: HttpScope<LoginRequest>): Promise<void> {
    const credentials = {
      email: request.body.email,
      password: request.body.password,
    };

    const user = await loginUseCase.execute(credentials);

    response.body = { data: user };
  }
}
