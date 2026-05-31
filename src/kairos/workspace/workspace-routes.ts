import { validateRequest } from '@/framework/http/validator';
import { createWorkspaceController } from '@/kairos/workspace/adapter/http/create-workspace/create-workspace-controller';
import { createWorkspaceRules } from '@/kairos/workspace/adapter/http/create-workspace/create-workspace-request';
import { Post, RouteGroup } from '@koala-ts/framework/routing';

export const workspaceRoutes = RouteGroup({ prefix: '/workspaces', namePrefix: 'workspaces.' }, () => [
  Post('/', 'create', validateRequest(createWorkspaceRules), createWorkspaceController),
]);
