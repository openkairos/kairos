import { authenticationRoutes } from '@/kairos/authentication/interface/http/authentication-routes';
import { sourceRoutes } from '@/kairos/source/source-routes';
import { homeRoute } from '@/kairos/system/interface/http/system-routes';
import { workspaceRoutes } from '@/kairos/workspace/workspace-routes';
import { RouteGroup } from '@koala-ts/framework/routing';

const apiRoutes = RouteGroup({ prefix: '/api', namePrefix: 'api.' }, () => [
  RouteGroup({ prefix: '/v1', namePrefix: 'v1.' }, () => [authenticationRoutes, workspaceRoutes, sourceRoutes]),
]);

export const routes = [homeRoute, apiRoutes];
