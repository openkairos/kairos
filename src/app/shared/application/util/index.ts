import type { Logger, LogLevel } from './types';
import { createLogger } from '@/app/shared/infrastructure/logging/logger';

export { default as createHttpError } from 'http-errors';
export { useEmit, useRequest, useResponse } from '@koala-ts/framework';
export * from './assert';
export * from './types';

export const logger: Logger = createLogger({
  level: process.env.LOG_LEVEL as LogLevel,
});
