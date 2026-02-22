import { describe, expect, it, vi } from 'vitest';
import { createMapSuccessToHttp } from '@/app/shared/adapter/http/map-success-to-http';

describe('Map success to HTTP', () => {
  it('should map successful value to HTTP ok payload', () => {
    const normalized = { id: 'u-1' };
    const normalize = vi.fn().mockReturnValue(normalized);
    const mapSuccessToHttp = createMapSuccessToHttp({ normalize });
    const value = { id: 'u-1', username: 'admin' };

    const response = mapSuccessToHttp(value, 200, { groups: ['auth:login'] });

    expect(normalize).toHaveBeenCalledWith(value, { groups: ['auth:login'] });
    expect(response).toEqual({
      status: 200,
      body: { data: normalized },
    });
  });
});
