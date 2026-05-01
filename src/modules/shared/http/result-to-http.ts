import { isErr, type Result } from '@/modules/shared/kernel/result';
import { HTTP_INTERNAL_SERVER_ERROR, type StatusCode } from '@/modules/shared/http/status-code';

export interface HttpResponsePayload {
  status: StatusCode;
  body: unknown;
}

type StatusResolver<T> = StatusCode | ((value: T) => StatusCode);
interface PropertyMetadata {
  ignore?: boolean;
  groups?: string[];
  serializedName?: string;
  metadata?: Metadata;
}

type Metadata = Record<string, PropertyMetadata>;

interface SerializeOptions {
  groups?: string[];
  metadata?: Metadata;
}
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
  normalize: (input: unknown, options?: SerializeOptions) => unknown;
}>;

type ResultToHttpMapper = <T, E extends { type: string }>(
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
