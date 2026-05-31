import { assertOneOf } from '@/kairos/shared/assert/value-assertions';
import type { LogLevel } from '@/kairos/shared/logger.type';

const logLevel = process.env.LOG_LEVEL ?? 'info';
assertOneOf<LogLevel>(logLevel, 'fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent');

export const loggerConfig = {
  level: logLevel,
};
