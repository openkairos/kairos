import { type KoalaConfig } from '@koala-ts/framework';
import { RouteGroup } from '@koala-ts/framework/routing';
import { authenticationRoutes } from '@/app/authentication/interface/http/authentication-routes';
import { homeRoute } from '@/app/home/interface/http/home-routes';
import { workspaceRoutes } from '@/app/workspace/interface/http/workspace-routes';

const apiRoutes = RouteGroup({ prefix: '/api', namePrefix: 'api.' }, () => [
  RouteGroup({ prefix: '/v1', namePrefix: 'v1.' }, () => [authenticationRoutes, workspaceRoutes]),
]);

export const appConfig: KoalaConfig = {
  controllers: [],
  routes: [homeRoute, apiRoutes],
  globalMiddleware: [],
};
