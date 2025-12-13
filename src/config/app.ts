import { type KoalaConfig } from '@koala-ts/framework';
import { eventBusMiddleware } from '@koala-ts/framework/dist/Event';
import { HomeController } from '@/controller/HomeController';

export const appConfig: KoalaConfig = {
  controllers: [
    HomeController,
  ],
  globalMiddleware: [
    eventBusMiddleware,
  ],
};
