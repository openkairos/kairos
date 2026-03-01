import { type HttpScope, Route } from '@koala-ts/framework';
import { LoginRequest } from '@/app/authentication/interface/http/login-request';
import { loginResponse } from '@/app/authentication/interface/http/login-response';
import { login, validateLoginRequest } from '@/composition/auth/login';
import { mapResultToHttp } from '@/composition/shared/http/normalization';

export class AuthController {
  @Route({ method: 'POST', path: '/api/v1/login', middleware: [validateLoginRequest] })
  async login({ response, request }: HttpScope<LoginRequest>): Promise<void> {
    const result = await login(request.body);

    const http = mapResultToHttp(result, loginResponse);

    response.status = http.status;
    response.body = http.body;
  }
}
