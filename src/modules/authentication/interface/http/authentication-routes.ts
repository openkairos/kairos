import { Route, RouteGroup } from '@koala-ts/framework/routing';
import { validateLoginRequest } from '@/modules/authentication/authentication-composition';
import { loginHandler } from '@/modules/authentication/interface/http/login-handler';

export const authenticationRoutes = RouteGroup({ namePrefix: 'auth.' }, () => [
  Route({
    method: 'POST',
    path: '/login',
    name: 'login',
    middleware: [validateLoginRequest],
    handler: loginHandler,
  }),
]);
