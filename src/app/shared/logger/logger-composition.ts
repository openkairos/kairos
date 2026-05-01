import { type Logger } from '@/app/shared/logger/logger';
import { createLogger } from '@/app/shared/logger/pino';
import { loggerConfig } from '@/config/logger';

export const appLogger: Logger = createLogger({
  level: loggerConfig.level,
});
