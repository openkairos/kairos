import { sink } from 'pino-test';
import { describe, expect, test } from 'vitest';
import { createLogger } from './logger';

describe('Logger', () => {
  test.each([
    { level: 'fatal' },
    { level: 'error' },
    { level: 'warn' },
    { level: 'info' },
    { level: 'debug' },
    { level: 'trace' },
  ])('Log level: $level', async ({ level }) => {
    const stream = sink();
    const logger = createLogger({ level: 'trace' }, stream);

    logger[level as keyof typeof logger]('test message', { foo: 'bar' });

    const logged = await stream.read();
    expect(logged.msg).toBe('test message');
    expect(logged.level).toBe(level);
    expect(logged.foo).toBe('bar');
  });
});
