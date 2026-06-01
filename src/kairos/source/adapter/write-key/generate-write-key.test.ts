import { describe, expect, test } from 'vitest';
import { generateWriteKey } from './generate-write-key';

describe('generate write key', () => {
  test('returns url-safe random write keys', () => {
    const firstWriteKey = generateWriteKey();
    const secondWriteKey = generateWriteKey();

    expect(firstWriteKey).toEqual(expect.any(String));
    expect(firstWriteKey).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(secondWriteKey).toEqual(expect.any(String));
    expect(secondWriteKey).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(secondWriteKey).not.toBe(firstWriteKey);
  });
});
