import { generateWriteKey } from '@/kairos/source/adapter/security/generate-write-key';
import { describe, expect, test } from 'vitest';

describe('Generate write key', () => {
  test('generates a write key', () => {
    const writeKey = generateWriteKey();

    expect(writeKey).toMatch(/^kairos_wk_[a-f0-9]{64}$/);
  });
});
