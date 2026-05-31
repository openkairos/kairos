import { validateRequest } from '@/framework/http/validator';
import { createSourceController } from '@/kairos/source/adapter/http/create-source/create-source-controller';
import { createSourceRules } from '@/kairos/source/adapter/http/create-source/create-source-request';
import { Post, RouteGroup } from '@koala-ts/framework/routing';

export const sourceRoutes = RouteGroup({ prefix: '/workspaces/:workspaceId/sources', namePrefix: 'sources.' }, () => [
  Post('/', 'create', validateRequest(createSourceRules), createSourceController),
]);
