import type { HttpRequest } from '@koala-ts/framework';

export interface CreateSourceRequest extends HttpRequest {
  params: {
    workspaceId: string;
  };
  body: {
    name: string;
    description?: string;
    appIdentifier: string;
  };
}

export const createSourceRules = {
  name: ['notBlank', { type: { type: 'string' } }],
  description: [{ type: { type: 'string' } }],
  appIdentifier: ['notBlank', { type: { type: 'string' } }],
};
