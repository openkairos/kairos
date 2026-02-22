import { type Result } from '@/app/shared/application/result';
import {
  createResultToHttpMapper,
  type HttpResponsePayload,
  type ResultHttpMapping,
} from '@/app/shared/infrastructure/http/result-to-http';
import { normalize } from '@/composition/http/normalization';

const resultToHttpMapper = createResultToHttpMapper({ normalize });

export function mapResultToHttp<T, E extends { type: string }>(
  result: Result<T, E>,
  httpMapping: ResultHttpMapping<T, E>,
): HttpResponsePayload {
  return resultToHttpMapper(result, httpMapping);
}
