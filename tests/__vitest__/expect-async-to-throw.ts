import { expect } from 'vitest';

export async function expectAsyncToThrow(promise: Promise<unknown>, error: unknown): Promise<void> {
  await expect(promise).rejects.toBe(error);
}
