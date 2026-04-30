import { Route, RouteGroup } from '@koala-ts/framework/routing';
import { validateLoginRequest } from '@/app/authentication/authentication-composition';
import { loginHandler } from '@/app/authentication/interface/http/login-handler';

export const authenticationRoutes = RouteGroup({ namePrefix: 'auth.' }, () => [
  Route({
    method: 'POST',
    path: '/login',
    name: 'login',
    middleware: [validateLoginRequest],
    handler: loginHandler,
  }),
]);
