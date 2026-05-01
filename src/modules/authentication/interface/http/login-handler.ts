import { type HttpScope } from '@koala-ts/framework';
import { type LoginRequest } from '@/modules/authentication/interface/http/login-request';
import { loginResponse } from '@/modules/authentication/interface/http/login-response';
import { login } from '@/modules/authentication/authentication-composition';
import { mapResultToHttp } from '@/modules/shared/http';

export async function loginHandler({ response, request }: HttpScope): Promise<void> {
  const result = await login(request.body as LoginRequest['body']);

  const http = mapResultToHttp(result, loginResponse);

  response.status = http.status;
  response.body = http.body;
}
