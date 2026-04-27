import { type KoalaConfig } from '@koala-ts/framework';
import { apiRoutes, homeRoute } from '@/routes';

export const appConfig: KoalaConfig = {
  controllers: [],
  routes: [homeRoute, apiRoutes],
  globalMiddleware: [],
};
