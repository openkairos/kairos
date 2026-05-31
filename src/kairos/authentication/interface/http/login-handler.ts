import { mapResultToHttp } from '@/interface/http/map-result-to-http';
import { login } from '@/kairos/authentication/authentication-composition';
import type { LoginRequest } from '@/kairos/authentication/interface/http/login-request';
import { loginResponse } from '@/kairos/authentication/interface/http/login-response';
import type { HttpScope } from '@koala-ts/framework';

export async function loginHandler({ response, request }: HttpScope): Promise<void> {
  const result = await login(request.body as LoginRequest['body']);

  const http = mapResultToHttp(result, loginResponse);

  response.status = http.status;
  response.body = http.body;
}
