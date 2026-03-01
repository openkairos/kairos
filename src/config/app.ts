import { type KoalaConfig } from '@koala-ts/framework';
import { AuthController } from '@/controller/AuthController';
import { HomeController } from '@/controller/HomeController';
import { WorkspaceController } from '@/controller/WorkspaceController';

export const appConfig: KoalaConfig = {
  controllers: [HomeController, AuthController, WorkspaceController],
  globalMiddleware: [],
};
