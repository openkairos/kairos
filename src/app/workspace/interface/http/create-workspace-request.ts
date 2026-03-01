import type { HttpRequest } from '@koala-ts/framework';

export interface CreateWorkspaceRequest extends HttpRequest {
  body: {
    name: string;
    slug: string;
  };
}

export const createWorkspaceRequestConstraints = {
  name: ['notBlank'],
  slug: ['notBlank', 'slug'],
};
