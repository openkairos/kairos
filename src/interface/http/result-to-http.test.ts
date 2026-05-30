import { createResultToHttpMapper, type ResultHttpMapping } from '@/interface/http/result-to-http';
import { HTTP_CREATED, HTTP_INTERNAL_SERVER_ERROR, HTTP_UNAUTHORIZED } from '@/interface/http/status-code';
import { err } from '@/kairos/shared/result/err';
import { ok } from '@/kairos/shared/result/ok';
import { describe, expect, it } from 'vitest';

describe('Result to HTTP mapper', () => {
  it('should map success results using the configured status and serializer options', () => {
    const normalize = (value: unknown): unknown => value;
    const mapResultToHttp = createResultToHttpMapper({ normalize });
    const mapping: ResultHttpMapping<{ id: string }, { type: 'INVALID_CREDENTIALS'; message: string }> = {
      success: {
        status: (): typeof HTTP_CREATED => HTTP_CREATED,
        serialize: (): { groups: string[] } => ({ groups: ['users:create'] }),
      },
      error: {
        byType: {
          INVALID_CREDENTIALS: {
            status: HTTP_UNAUTHORIZED,
          },
        },
      },
    };

    const response = mapResultToHttp(ok({ id: 'u-1' }), mapping);

    expect(response).toEqual({
      status: HTTP_CREATED,
      body: { data: { id: 'u-1' } },
    });
  });

  it('should map errors by type', () => {
    const normalize = (value: unknown): unknown => value;
    const mapResultToHttp = createResultToHttpMapper({ normalize });
    const mapping: ResultHttpMapping<unknown, { type: 'INVALID_CREDENTIALS'; message: string }> = {
      success: {
        status: HTTP_CREATED,
      },
      error: {
        byType: {
          INVALID_CREDENTIALS: {
            status: HTTP_UNAUTHORIZED,
          },
        },
      },
    };

    const response = mapResultToHttp(
      err({ type: 'INVALID_CREDENTIALS' as const, message: 'Invalid credentials' }),
      mapping,
    );

    expect(response).toEqual({
      status: HTTP_UNAUTHORIZED,
      body: { type: 'INVALID_CREDENTIALS', message: 'Invalid credentials' },
    });
  });

  it('should fallback to internal server error for unmapped errors', () => {
    const normalize = (value: unknown): unknown => value;
    const mapResultToHttp = createResultToHttpMapper({ normalize });
    const mapping: ResultHttpMapping<unknown, { type: 'UNEXPECTED'; message: string }> = {
      success: {
        status: HTTP_CREATED,
      },
      error: {
        byType: {},
      },
    };

    const response = mapResultToHttp(err({ type: 'UNEXPECTED' as const, message: 'Unexpected' }), mapping);

    expect(response).toEqual({
      status: HTTP_INTERNAL_SERVER_ERROR,
      body: { type: 'UNEXPECTED', message: 'Unexpected' },
    });
  });
});
