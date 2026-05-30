import { err, isErr } from '@/kairos/shared/result/err';
import { ok } from '@/kairos/shared/result/ok';
import { describe, expect, test } from 'vitest';

describe('Err result', () => {
  test('constructor', () => {
    expect(err('ERROR')).toEqual({ isOk: false, error: 'ERROR' });
  });

  test('type guard', () => {
    expect(err('ERROR')).toSatisfy(isErr);
    expect(ok(35)).not.toSatisfy(isErr);
    expect({}).toSatisfy(isErr);
  });
});
