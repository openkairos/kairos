import type { Err, Result } from '@/kairos/shared/result/result.type';

export function err<E>(error: E): Err<E> {
  return { isOk: false, error };
}

export const isErr = <T, E>(r: Result<T, E>): r is Err<E> => !r.isOk;
