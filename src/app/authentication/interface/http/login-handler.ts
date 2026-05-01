import { type HttpScope } from '@koala-ts/framework';
import { type LoginRequest } from '@/app/authentication/interface/http/login-request';
import { loginResponse } from '@/app/authentication/interface/http/login-response';
import { login } from '@/app/authentication/authentication-composition';
import { mapResultToHttp } from '@/app/shared/http';

export async function loginHandler({ response, request }: HttpScope): Promise<void> {
  const result = await login(request.body as LoginRequest['body']);

  const http = mapResultToHttp(result, loginResponse);

  response.status = http.status;
  response.body = http.body;
}
