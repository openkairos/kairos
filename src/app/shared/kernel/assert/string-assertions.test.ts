import { describe, expect, it } from 'vitest';
import { assertIsNonEmptyString, assertIsString } from '@/app/shared/kernel/assert';

describe('String assertions', () => {
  it('assertIsString accepts strings', () => {
    expect(() => {
      assertIsString('test');
    }).not.toThrow();
  });

  it('assertIsString rejects non-strings', () => {
    expect(() => {
      assertIsString(123);
    }).toThrow('Value is not a string');
  });

  it.each([123, ''])('assertIsNonEmptyString rejects invalid value: %p', value => {
    expect(() => {
      assertIsNonEmptyString(value);
    }).toThrow('Value is not a non-empty string');
  });

  it('assertIsNonEmptyString accepts non-empty strings', () => {
    expect(() => {
      assertIsNonEmptyString('valid string');
    }).not.toThrow();
  });
});
