import type { HttpRequest } from '@koala-ts/framework';

export interface CreateWorkspaceRequest extends HttpRequest {
  body: {
    environments?: string[];
    name: string;
    slug: string;
  };
}

export const createWorkspaceRequestConstraints = {
  environments: ['unique', { all: { constraints: [{ type: { type: 'string' } }, 'notBlank'] } }],
  name: ['notBlank'],
  slug: ['notBlank', 'slug'],
};
