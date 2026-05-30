import { err } from '@/kairos/shared/result/err';
import { isOk, ok } from '@/kairos/shared/result/ok';
import { describe, expect, test } from 'vitest';

describe('Ok result', () => {
  test('constructor', () => {
    expect(ok(35)).toEqual({ isOk: true, value: 35 });
  });

  test('type guard', () => {
    expect(ok(35)).toSatisfy(isOk);
    expect(err('ERROR')).not.toSatisfy(isOk);
    expect({}).not.toSatisfy(isOk);
  });
});
