import type { Normalizer, SerializeOptions } from '@/interface/http/normalizer.type';
import { HTTP_INTERNAL_SERVER_ERROR, type StatusCode } from '@/interface/http/status-code';
import { isErr } from '@/kairos/shared/result/err';
import type { Result } from '@/kairos/shared/result/result.type';

export interface HttpResponsePayload {
  status: StatusCode;
  body: unknown;
}

type StatusResolver<T> = StatusCode | ((value: T) => StatusCode);
type SerializeOptionsResolver<T> = SerializeOptions | ((value: T) => SerializeOptions | undefined);

interface ErrorHttpResponse<E> {
  status: StatusCode;
  body?: unknown;
  mapBody?: (error: E) => unknown;
}

type ErrorResponseByType<E extends { type: string }> = Partial<Record<E['type'], ErrorHttpResponse<E>>>;

export interface ResultHttpMapping<T, E extends { type: string }> {
  success: {
    status: StatusResolver<T>;
    serialize?: SerializeOptionsResolver<T>;
  };
  error: {
    byType: ErrorResponseByType<E>;
    fallback?: (error: E) => HttpResponsePayload;
  };
}

type CreateResultToHttpMapperDependencies = Readonly<{
  normalize: Normalizer;
}>;

export type ResultToHttpMapper = <T, E extends { type: string }>(
  result: Result<T, E>,
  mapping: ResultHttpMapping<T, E>,
) => HttpResponsePayload;

const resolveValue = <T, U>(value: T, resolver: U | ((current: T) => U)): U =>
  typeof resolver === 'function' ? (resolver as (current: T) => U)(value) : resolver;

const resolveErrorBody = <E>(error: E, response: ErrorHttpResponse<E>): unknown => {
  if (response.mapBody !== undefined) return response.mapBody(error);
  if (response.body !== undefined) return response.body;

  return error;
};

const mapSuccess = <T>(
  value: T,
  mapping: ResultHttpMapping<T, { type: string }>['success'],
  normalize: CreateResultToHttpMapperDependencies['normalize'],
): HttpResponsePayload => {
  const status = resolveValue(value, mapping.status);
  const serializeOptions = mapping.serialize !== undefined ? resolveValue(value, mapping.serialize) : undefined;

  return {
    status,
    body: { data: normalize(value, serializeOptions) },
  };
};

const mapError = <E extends { type: string }>(
  error: E,
  mapping: ResultHttpMapping<unknown, E>['error'],
): HttpResponsePayload => {
  const errorResponse = mapping.byType[error.type as E['type']];
  if (errorResponse !== undefined) {
    return {
      status: errorResponse.status,
      body: resolveErrorBody(error, errorResponse),
    };
  }

  return (
    mapping.fallback?.(error) ?? {
      status: HTTP_INTERNAL_SERVER_ERROR,
      body: error,
    }
  );
};

export function createResultToHttpMapper({ normalize }: CreateResultToHttpMapperDependencies): ResultToHttpMapper {
  return function resultToHttpMapper<T, E extends { type: string }>(
    result: Result<T, E>,
    mapping: ResultHttpMapping<T, E>,
  ): HttpResponsePayload {
    return isErr(result) ? mapError(result.error, mapping.error) : mapSuccess(result.value, mapping.success, normalize);
  };
}
