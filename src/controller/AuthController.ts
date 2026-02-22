import { type HttpScope, Route } from '@koala-ts/framework';
import { LoginRequest } from '@/app/authentication/interface/login-request';
import { mapResultToHttp } from '@/app/shared/adapter/http/map-result-to-http';
import { loginUser, validateLoginRequest } from '@/composition/authentication/login';
import { loginHttpMapper } from '@/composition/http/mapper';

export class AuthController {
  @Route({ method: 'POST', path: '/api/v1/login', middleware: [validateLoginRequest] })
  async login({ response, request }: HttpScope<LoginRequest>): Promise<void> {
    const result = await loginUser(request.body);

    const http = mapResultToHttp(result, loginHttpMapper);

    response.status = http.status;
    response.body = http.body;
  }
}
