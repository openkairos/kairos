import { type LogLevel } from '@/shared/application/logging';

interface LogConfig {
  level: LogLevel,
}

export const logConfig: LogConfig = {
  level: (process.env.LOG_LEVEL ?? 'info') as LogLevel,
};
