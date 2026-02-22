export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent';

export interface LoggerOptions {
  level: LogLevel;
}

export interface Logger {
  fatal(message: string, context?: unknown): void;

  error(message: string, context?: unknown): void;

  warn(message: string, context?: unknown): void;

  info(message: string, context?: unknown): void;

  debug(message: string, context?: unknown): void;

  trace(message: string, context?: unknown): void;
}
