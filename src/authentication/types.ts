import { type HttpRequest } from '@koala-ts/framework';

export interface LoginRequest extends HttpRequest {
  body: {
    email: string;
    password: string;
  };
}
