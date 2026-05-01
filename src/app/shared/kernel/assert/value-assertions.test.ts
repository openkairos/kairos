import { describe, expect, it } from 'vitest';
import { assertOneOf } from '@/app/shared/kernel/assert';

const validLogLevels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] as const;

describe('Value assertions', () => {
  it('assertOneOf accepts allowed values', () => {
    expect(() => {
      assertOneOf('info', ...validLogLevels);
    }).not.toThrow();
  });

  it('assertOneOf rejects values outside the allowed list', () => {
    expect(() => {
      assertOneOf('verbose', ...validLogLevels);
    }).toThrow('Value is not one of: fatal, error, warn, info, debug, trace, silent');
  });
});
