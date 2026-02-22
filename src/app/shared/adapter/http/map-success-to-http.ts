import { type HttpResponsePayload } from '@/app/shared/adapter/http/map-result-to-http';
import { type StatusCode } from '@/app/shared/interface/http/status-code';

export interface NormalizerOptions {
  groups?: string[];
  metadata?: unknown;
}

export type NormalizeValue = (value: unknown, options?: NormalizerOptions) => unknown;

export type MapSuccessToHttp = (value: unknown, status: StatusCode, options?: NormalizerOptions) => HttpResponsePayload;

interface CreateMapSuccessToHttpDependencies {
  normalize: NormalizeValue;
}

export function createMapSuccessToHttp({ normalize }: CreateMapSuccessToHttpDependencies): MapSuccessToHttp {
  return function mapSuccessToHttp(
    value: unknown,
    status: StatusCode,
    options?: NormalizerOptions,
  ): HttpResponsePayload {
    return {
      status,
      body: { data: normalize(value, options) },
    };
  };
}
