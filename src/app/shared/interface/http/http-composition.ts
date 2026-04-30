import { createNormalizer, type Normalizer } from '@koala-ts/framework';
import { builtInConstraints, createValidator, flattenViolations } from '@koala-ts/framework/validator';
import type { Result } from '@/app/shared/application/result';
import {
  createResultToHttpMapper,
  type HttpResponsePayload,
  type ResultHttpMapping,
} from '@/app/shared/infrastructure/http/result-to-http';
import { validationMiddleware } from '@/app/shared/interface/http/validation-middleware';

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
