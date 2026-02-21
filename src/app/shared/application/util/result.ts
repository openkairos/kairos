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
