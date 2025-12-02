import { sink } from 'pino-test';
import { describe, expect, it } from 'vitest';
import { createLogger } from './logger';

describe('Logger', () => {
  it('should log message, context and log level', async () => {
    const stream = sink();
    const logger = createLogger({ level: 'info' }, stream);

    logger.info('test message', { foo: 'bar' });

    const logged = await stream.read();

    expect(logged.msg).toBe('test message');
    expect(logged.level).toBe('info');
    expect(logged.foo).toBe('bar');
  });
});
