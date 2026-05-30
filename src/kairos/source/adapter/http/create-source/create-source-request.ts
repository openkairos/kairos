import type { HttpRequest } from '@koala-ts/framework';

export interface CreateSourceRequest extends HttpRequest {
  body: {
    description?: string;
    environments: string[];
    labels: string[];
    name: string;
  };
  params: {
    workspaceId: string;
  };
}

export const createSourceRules = {
  environments: ['unique', { all: { constraints: [{ type: { type: 'string' } }, 'notBlank'] } }],
  labels: ['unique', { all: { constraints: [{ type: { type: 'string' } }, 'notBlank'] } }],
  name: [{ type: { type: 'string' } }, 'notBlank'],
};
