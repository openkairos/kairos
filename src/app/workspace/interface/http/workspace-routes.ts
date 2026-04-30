import { Route, RouteGroup } from '@koala-ts/framework/routing';
import { createWorkspaceHandler } from '@/app/workspace/interface/http/create-workspace-handler';
import { validateCreateWorkspaceRequest } from '@/app/workspace/workspace-composition';

export const workspaceRoutes = RouteGroup({ prefix: '/workspaces', namePrefix: 'workspaces.' }, () => [
  Route({
    method: 'POST',
    path: '/',
    name: 'create',
    middleware: [validateCreateWorkspaceRequest],
    handler: createWorkspaceHandler,
  }),
]);
