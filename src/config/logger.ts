import { type LogLevel } from '@/app/shared/application/logger';
import { assertIsString } from '@/app/shared/application/util';

const logLevel = process.env.LOG_LEVEL ?? 'info';
assertIsString(logLevel);

export const loggerConfig = {
  level: logLevel as LogLevel,
};
