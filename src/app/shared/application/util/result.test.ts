import { describe, expect, test } from 'vitest';
import { err, isErr, isOk, ok } from '@/app/shared/application/util/result';

describe('Result module', () => {
  test('Ok constructor', () => {
    expect(ok(35)).toEqual({ isOk: true, value: 35 });
  });

  test('Err constructor', () => {
    expect(err('ERROR')).toEqual({ isOk: false, error: 'ERROR' });
  });

  test('isOk type guard', () => {
    expect(ok(35)).toSatisfy(isOk);
    expect(err('ERROR')).not.toSatisfy(isOk);
    expect({}).not.toSatisfy(isOk);
  });

  test('isErr type guard', () => {
    expect(err('ERROR')).toSatisfy(isErr);
    expect(ok(35)).not.toSatisfy(isErr);
    expect({}).toSatisfy(isErr);
  });
});
