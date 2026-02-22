import { type HttpScope, Route } from '@koala-ts/framework';
import { loginHttpMapper } from '@/app/authentication/adapter/login-http-mapper';
import { LoginRequest, loginRequestConstraints } from '@/app/authentication/interface/login-request';
import { mapResultToHttp } from '@/app/shared/adapter/http/map-result-to-http';
import { loginUser } from '@/composition/authentication/login';
import { validateRequest } from '@/composition/http/middleware';

export class AuthController {
  @Route({ method: 'POST', path: '/api/v1/login', middleware: [validateRequest(loginRequestConstraints)] })
  async login({ response, request }: HttpScope<LoginRequest>): Promise<void> {
    const result = await loginUser(request.body);

    const http = mapResultToHttp(result, loginHttpMapper);

    response.status = http.status;
    response.body = http.body;
  }
}
