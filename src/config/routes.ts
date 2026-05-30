import { RouteGroup } from '@koala-ts/framework/routing';
import { authenticationRoutes } from '@/kairos/authentication/interface/http/authentication-routes';
import { homeRoute } from '@/kairos/system/interface/http/system-routes';
import { workspaceRoutes } from '@/kairos/workspace/interface/http/workspace-routes';

const apiRoutes = RouteGroup({ prefix: '/api', namePrefix: 'api.' }, () => [
  RouteGroup({ prefix: '/v1', namePrefix: 'v1.' }, () => [authenticationRoutes, workspaceRoutes]),
]);

export const routes = [homeRoute, apiRoutes];
