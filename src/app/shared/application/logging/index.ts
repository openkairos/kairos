import type { Logger, LogLevel } from '@/app/shared/application/logging/types';
import { createLogger } from '@/app/shared/infrastructure/logging/logger';

export * from './types';

export const logger: Logger = createLogger({
  level: process.env.LOG_LEVEL as LogLevel,
});
