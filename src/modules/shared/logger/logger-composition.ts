import { type Logger } from '@/modules/shared/logger/logger';
import { createLogger } from '@/modules/shared/logger/pino';
import { loggerConfig } from '@/config/logger';

export const appLogger: Logger = createLogger({
  level: loggerConfig.level,
});
