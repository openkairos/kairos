export function assertOneOf<T>(value: unknown, ...validValues: readonly T[]): asserts value is T {
  if (!validValues.includes(value as T)) {
    throw new Error(`Value is not one of: ${validValues.join(', ')}`);
  }
}
