import type { Ok, Result } from '@/kairos/shared/result/result.type';

export function ok<T>(value: T): Ok<T> {
  return { isOk: true, value };
}

export const isOk = <T, E>(r: Result<T, E>): r is Ok<T> => r.isOk;
