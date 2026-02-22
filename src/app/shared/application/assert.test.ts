import { describe, expect, it } from 'vitest';
import { assertIsNonEmptyString, assertIsString, assertOneOf } from '@/app/shared/application/assert';

describe('Assert utility', () => {
  describe('assert is string', () => {
    it('should pass if value is string', () => {
      expect(() => {
        assertIsString('test');
      }).not.toThrow();
    });

    it('should fail if value is not string', () => {
      expect(() => {
        assertIsString(123);
      }).toThrow('Value is not a string');
    });
  });

  describe('assert non-empty string', () => {
    it('should fail if the value is not string', () => {
      expect(() => {
        assertIsNonEmptyString(123);
      }).toThrow('Value is not a non-empty string');
    });

    it('should fail if the value is an empty string', () => {
      expect(() => {
        assertIsNonEmptyString('');
      }).toThrow('Value is not a non-empty string');
    });

    it('should pass if value is a non-empty string', () => {
      expect(() => {
        assertIsNonEmptyString('valid string');
      }).not.toThrow();
    });
  });

  describe('assert one of', () => {
    it('should pass if value is one of valid values', () => {
      expect(() => {
        assertOneOf('info', 'fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent');
      }).not.toThrow();
    });

    it('should fail if value is not one of valid values', () => {
      expect(() => {
        assertOneOf('verbose', 'fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent');
      }).toThrow('Value is not one of: fatal, error, warn, info, debug, trace, silent');
    });
  });
});
