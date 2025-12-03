import { logConfig } from '../../config/logging';
import { createLogger } from './logger';

export const logger = createLogger({
  level: logConfig.level,
});
