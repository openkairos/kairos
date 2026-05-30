import { describe, expect, test } from 'vitest';
import { frozenClock, systemClock } from '@/kairos/shared/clock';

describe('Clock', () => {
  test('system clock should return current date', () => {
    const before = new Date();

    const now = systemClock();

    const after = new Date();
    expect(now.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(now.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  test('frozen clock should return fixed date', () => {
    const fixedDate = new Date('2024-01-01T00:00:00Z');

    const now = frozenClock(fixedDate)();

    expect(now.getTime()).toBe(fixedDate.getTime());
  });
});
