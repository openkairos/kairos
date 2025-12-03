import { createLogger } from './logger';
import { logConfig } from '@/config/logging';
import { type Logger } from '@/shared/application/logging';

export const logger: Logger = createLogger({
  level: logConfig.level,
});
