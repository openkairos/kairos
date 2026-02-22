import { type HttpResponsePayload } from '@/app/shared/adapter/http/map-result-to-http';
import { type StatusCode } from '@/app/shared/interface/http/status-code';

interface PropertyMetadata {
  ignore?: boolean;
  groups?: string[];
  serializedName?: string;
  metadata?: Metadata;
}

type Metadata = Record<string, PropertyMetadata>;

interface NormalizerContext {
  groups?: string[];
  metadata?: Metadata;
}

type NormalizeValue = (input: unknown, context?: NormalizerContext) => unknown;

export type MapSuccessToHttp = (value: unknown, status: StatusCode, options?: NormalizerContext) => HttpResponsePayload;

interface CreateMapSuccessToHttpDependencies {
  normalize: NormalizeValue;
}

export function createMapSuccessToHttp({ normalize }: CreateMapSuccessToHttpDependencies): MapSuccessToHttp {
  return function mapSuccessToHttp(
    value: unknown,
    status: StatusCode,
    options?: NormalizerContext,
  ): HttpResponsePayload {
    return {
      status,
      body: { data: normalize(value, options) },
    };
  };
}
