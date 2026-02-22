import { createLogger } from './logger';
import { type Logger } from '@/app/shared/application/logger';
import { loggerConfig } from '@/config';

export const logger: Logger = createLogger({
  level: loggerConfig.level,
});
