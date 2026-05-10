import type { HttpRequest } from '@koala-ts/framework';

export interface CreateWorkspaceRequest extends HttpRequest {
  body: {
    environments?: string[];
    name: string;
    slug: string;
  };
}

export const createWorkspaceRequestConstraints = {
  name: ['notBlank'],
  slug: ['notBlank', 'slug'],
};
