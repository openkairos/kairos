import { type KoalaConfig } from '@koala-ts/framework';
import { HomeController } from '@/controller/HomeController';
import { eventBusMiddleware } from '@/shared/infrastructure/event-bus/event-bus';

export const appConfig: KoalaConfig = {
  controllers: [
    HomeController,
  ],
  globalMiddleware: [
    eventBusMiddleware,
  ],
};
