import { assertIsString } from '@/app/shared/application/assert';
import { type LogLevel } from '@/app/shared/application/logger';

const logLevel = process.env.LOG_LEVEL ?? 'info';
assertIsString(logLevel);

export const loggerConfig = {
  level: logLevel as LogLevel,
};
