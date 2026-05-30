declare const NonEmptyStringBrand: unique symbol;
type NonEmptyString = string & { readonly [NonEmptyStringBrand]: true };

export function assertIsString(value: unknown, message?: string): asserts value is string {
  if (typeof value !== 'string') throw new Error(message ?? 'Value is not a string');
}

export function assertIsNonEmptyString(value: unknown, message?: string): asserts value is NonEmptyString {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(message ?? 'Value is not a non-empty string');
  }
}
