import { loggerConfig } from '@/config/logger';
import { createLogger } from '@/framework/pino-logger/pino';
import { type Logger } from '@/kairos/shared/logger/logger.type';

export const appLogger: Logger = createLogger({
  level: loggerConfig.level,
});
