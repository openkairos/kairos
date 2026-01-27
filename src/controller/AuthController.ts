import { type HttpScope, Route } from '@koala-ts/framework';
import { loginUseCase } from '@/app/authentication';
import { LoginRequest } from '@/app/authentication/interface/login-request';

export class AuthController {
  @Route({ method: 'POST', path: '/api/v1/login' })
  async login({ response, request }: HttpScope<LoginRequest>): Promise<void> {
    response.body = { data: await loginUseCase.execute(request.body) };
  }
}
