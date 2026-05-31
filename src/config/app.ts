import type { KoalaConfig } from '@koala-ts/framework';
import { routes } from '@/config/routes';

export const appConfig: KoalaConfig = {
  controllers: [],
  routes,
  globalMiddleware: [],
};
