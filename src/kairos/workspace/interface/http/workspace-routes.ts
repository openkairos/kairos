import { Post, RouteGroup } from '@koala-ts/framework/routing';
import { createWorkspaceHandler } from '@/kairos/workspace/interface/http/create-workspace-handler';
import { validateCreateWorkspaceRequest } from '@/kairos/workspace/workspace-composition';

export const workspaceRoutes = RouteGroup({ prefix: '/workspaces', namePrefix: 'workspaces.' }, () => [
  Post('/', 'create', validateCreateWorkspaceRequest, createWorkspaceHandler),
]);
