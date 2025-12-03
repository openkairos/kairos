import { type LoggerOptions } from '../shared/infrastructure/logging/types';

interface LogConfig {
  level: LoggerOptions['level'];
}

export const logConfig: LogConfig = {
  level: (process.env.LOG_LEVEL ?? 'info') as LoggerOptions['level'],
};
