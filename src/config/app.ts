import { type KoalaConfig } from '@koala-ts/framework';
import { AuthController } from '@/controller/AuthController';
import { HomeController } from '@/controller/HomeController';

export const appConfig: KoalaConfig = {
  controllers: [HomeController, AuthController],
  globalMiddleware: [],
};
