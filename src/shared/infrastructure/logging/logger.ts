import { type DestinationStream, type Logger as Pino, type LoggerOptions as PinoOptions, pino } from 'pino';
import { type Logger, type LoggerOptions } from '../../application/logging';

export function createLogger(options: LoggerOptions, stream?: DestinationStream): Logger {
  const logger = pino(toPinoOptions(options), stream);

  return {
    fatal: (message: string, context?: unknown): void => {
      logWithContext('fatal', logger, message, context);
    },
    error: (message: string, context?: unknown): void => {
      logWithContext('error', logger, message, context);
    },
    warn: (message: string, context?: unknown): void => {
      logWithContext('warn', logger, message, context);
    },
    info: (message: string, context?: unknown): void => {
      logWithContext('info', logger, message, context);
    },
    debug: (message: string, context?: unknown): void => {
      logWithContext('debug', logger, message, context);
    },
    trace: (message: string, context?: unknown): void => {
      logWithContext('trace', logger, message, context);
    },
  };
}

function logWithContext(level: LoggerOptions['level'], logger: Pino, message: string, context?: unknown): void {
  if (context !== undefined) {
    logger[level](context, message);
  } else {
    logger[level](message);
  }
}

function toPinoOptions(options: LoggerOptions): PinoOptions {
  return {
    level: options.level,
    formatters: {
      level: (label) => ({ level: label }),
    },
  };
}
