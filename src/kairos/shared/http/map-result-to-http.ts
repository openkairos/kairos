import {
  createResultToHttpMapper,
  type HttpResponsePayload,
  type ResultHttpMapping,
} from '@/kairos/shared/http/result-to-http';
import type { Result } from '@/kairos/shared/result/result';
import { createNormalizer, type Normalizer } from '@koala-ts/framework';

export const normalize: Normalizer = createNormalizer([]);

export function mapResultToHttp<T, E extends { type: string }>(
  result: Result<T, E>,
  httpMapping: ResultHttpMapping<T, E>,
): HttpResponsePayload {
  const resultToHttpMapper = createResultToHttpMapper({ normalize });
  return resultToHttpMapper(result, httpMapping);
}
