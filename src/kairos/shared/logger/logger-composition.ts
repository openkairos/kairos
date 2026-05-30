import { loggerConfig } from '@/config/logger';
import { type Logger } from '@/kairos/shared/logger/logger.type';
import { createLogger } from '@/kairos/shared/logger/pino';

export const appLogger: Logger = createLogger({
  level: loggerConfig.level,
});
