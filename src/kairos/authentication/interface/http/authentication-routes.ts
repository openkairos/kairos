import { Post, RouteGroup } from '@koala-ts/framework/routing';
import { validateLoginRequest } from '@/kairos/authentication/authentication-composition';
import { loginHandler } from '@/kairos/authentication/interface/http/login-handler';

export const authenticationRoutes = RouteGroup({ namePrefix: 'auth.' }, () => [
  Post('/login', 'login', validateLoginRequest, loginHandler),
]);
