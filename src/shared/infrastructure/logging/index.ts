import { logConfig } from '../../../config/logging';
import { type Logger } from '../../application/logging';
import { createLogger } from './logger';

export const logger: Logger = createLogger({
  level: logConfig.level,
});
