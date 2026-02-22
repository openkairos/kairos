import { createLogger } from './pino';
import { type Logger } from '@/app/shared/application/logger';
import { loggerConfig } from '@/config';

export const appLogger: Logger = createLogger({
  level: loggerConfig.level,
});
