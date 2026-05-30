import { type Logger } from '@/kairos/shared/logger/logger';
import { createLogger } from '@/kairos/shared/logger/pino';
import { loggerConfig } from '@/config/logger';

export const appLogger: Logger = createLogger({
  level: loggerConfig.level,
});
