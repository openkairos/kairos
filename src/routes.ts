import { Get, Route, RouteGroup } from '@koala-ts/framework/routing';
import { loginHandler } from '@/app/authentication/interface/http/login-handler';
import { homeHandler } from '@/app/home/interface/http/home-handler';
import { createWorkspaceHandler } from '@/app/workspace/interface/http/create-workspace-handler';
import { validateLoginRequest } from '@/composition/auth/login';
import { validateCreateWorkspaceRequest } from '@/composition/workspace/create-workspace';

export const homeRoute = Get('/', 'home', homeHandler);

const authRoutes = RouteGroup({ namePrefix: 'auth.' }, () => [
  Route({
    method: 'POST',
    path: '/login',
    name: 'login',
    middleware: [validateLoginRequest],
    handler: loginHandler,
  }),
]);

const workspaceRoutes = RouteGroup({ prefix: '/workspaces', namePrefix: 'workspaces.' }, () => [
  Route({
    method: 'POST',
    path: '/',
    name: 'create',
    middleware: [validateCreateWorkspaceRequest],
    handler: createWorkspaceHandler,
  }),
]);

export const apiRoutes = RouteGroup({ prefix: '/api', namePrefix: 'api.' }, () => [
  RouteGroup({ prefix: '/v1', namePrefix: 'v1.' }, () => [authRoutes, workspaceRoutes]),
]);
