import { describe, expect, test } from 'vitest';
import { err, ok } from '@/app/shared/application/util/result';

describe('Result module', () => {
  test('Ok constructor', () => {
    expect(ok(35)).toEqual({ isOk: true, value: 35 });
  });

  test('Err constructor', () => {
    expect(err('ERROR')).toEqual({ isOk: false, error: 'ERROR' });
  });
});
