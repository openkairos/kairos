import { describe, expect, it, vi } from 'vitest';
import { mapResultToHttp } from '@/app/shared/adapter/http/map-result-to-http';
import { err, ok } from '@/app/shared/application/result';

describe('Map result to HTTP', () => {
  it('should use on ok mapper for success results', () => {
    const onOk = vi.fn();
    const onErr = vi.fn();
    const mapper = { onOk, onErr };

    mapResultToHttp(ok(35), mapper);

    expect(onOk).toHaveBeenCalledWith(35);
    expect(onErr).not.toHaveBeenCalled();
  });

  it('should use on err mapper for error results', () => {
    const onOk = vi.fn();
    const onErr = vi.fn();
    const mapper = { onOk, onErr };

    mapResultToHttp(err('Something went wrong'), mapper);

    expect(onErr).toHaveBeenCalledWith('Something went wrong');
    expect(onOk).not.toHaveBeenCalled();
  });
});
