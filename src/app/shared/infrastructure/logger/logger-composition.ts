import { type Logger } from '@/app/shared/application/logger';
import { createLogger } from '@/app/shared/infrastructure/logger/pino';
import { loggerConfig } from '@/config/logger';

export const appLogger: Logger = createLogger({
  level: loggerConfig.level,
});
