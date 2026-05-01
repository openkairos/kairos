export interface Ok<T> {
  isOk: true;
  value: T;
}

export interface Err<E> {
  isOk: false;
  error: E;
}

export type Result<T, E> = Ok<T> | Err<E>;

export function ok<T>(value: T): Ok<T> {
  return { isOk: true, value };
}

export function err<E>(error: E): Err<E> {
  return { isOk: false, error };
}

export const isOk = <T, E>(r: Result<T, E>): r is Ok<T> => r.isOk;
export const isErr = <T, E>(r: Result<T, E>): r is Err<E> => !r.isOk;
