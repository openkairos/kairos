import { logConfig } from '@/config/logging';
import type { Logger } from '@/shared/application/logging/types';
import { createLogger } from '@/shared/infrastructure/logging/logger';

export * from './types';

export const logger: Logger = createLogger({
  level: logConfig.level,
});
