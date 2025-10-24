import { type KoalaConfig } from '@koala-ts/framework';
import { HomeController } from '../controller/HomeController';

export const appConfig: KoalaConfig = {
  controllers: [
    HomeController,
  ],
};
