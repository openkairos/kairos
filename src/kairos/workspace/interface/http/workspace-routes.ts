import { createWorkspaceController } from '@/kairos/workspace/interface/http/create-workspace-controller';
import { validateCreateWorkspaceRequest } from '@/kairos/workspace/workspace-composition';
import { Post, RouteGroup } from '@koala-ts/framework/routing';

export const workspaceRoutes = RouteGroup({ prefix: '/workspaces', namePrefix: 'workspaces.' }, () => [
  Post('/', 'create', validateCreateWorkspaceRequest, createWorkspaceController),
]);
