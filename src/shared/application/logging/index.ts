import type { Logger, LogLevel } from '@/shared/application/logging/types';
import { createLogger } from '@/shared/infrastructure/logging/logger';

export * from './types';

export const logger: Logger = createLogger({
  level: process.env.LOG_LEVEL as LogLevel,
});
