type NonEmptyString<T extends string> = T extends '' ? never : T;

export function assertIsString(value: unknown, message?: string): asserts value is string {
  if (typeof value !== 'string') throw new Error(message ?? 'Value is not a string');
}

export function assertIsNonEmptyString<T extends string>(
  value: unknown,
  message?: string,
): asserts value is NonEmptyString<T> {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(message ?? 'Value is not a non-empty string');
  }
}
