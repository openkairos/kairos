import { assertOneOf } from '@/kairos/shared/kernel/assert';
import { type LogLevel } from '@/kairos/shared/logger/logger';

const logLevel = process.env.LOG_LEVEL ?? 'info';
assertOneOf<LogLevel>(logLevel, 'fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent');

export const loggerConfig = {
  level: logLevel,
};
