import { createNormalizer, type Normalizer } from '@koala-ts/framework';
import { builtInConstraints, createValidator, flattenViolations } from '@koala-ts/framework/validator';
import type { Result } from '@/modules/shared/kernel/result';
import {
  createResultToHttpMapper,
  type HttpResponsePayload,
  type ResultHttpMapping,
} from '@/modules/shared/http/result-to-http';
import { validationMiddleware } from '@/modules/shared/http/validation-middleware';

export const normalize: Normalizer = createNormalizer([]);

export function mapResultToHttp<T, E extends { type: string }>(
  result: Result<T, E>,
  httpMapping: ResultHttpMapping<T, E>,
): HttpResponsePayload {
  const resultToHttpMapper = createResultToHttpMapper({ normalize });
  return resultToHttpMapper(result, httpMapping);
}

const validate = createValidator({ constraints: builtInConstraints });

export const validateRequest = validationMiddleware(validate, flattenViolations);
