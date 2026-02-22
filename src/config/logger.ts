import { assertOneOf } from '@/app/shared/application/assert';
import { type LogLevel } from '@/app/shared/application/logger';

const logLevel = process.env.LOG_LEVEL ?? 'info';
assertOneOf<LogLevel>(logLevel, 'fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent');

export const loggerConfig = {
  level: logLevel,
};
