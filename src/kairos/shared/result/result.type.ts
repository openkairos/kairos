export interface Ok<T> {
  isOk: true;
  value: T;
}

export interface Err<E> {
  isOk: false;
  error: E;
}

export type Result<T, E> = Ok<T> | Err<E>;
