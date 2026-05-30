import type { HttpRequest } from '@koala-ts/framework';

export interface LoginRequest extends HttpRequest {
  body: {
    email: string;
    password: string;
  };
}

export const loginRequestConstraints = {
  email: ['notBlank', 'email'],
  password: ['notBlank'],
};
