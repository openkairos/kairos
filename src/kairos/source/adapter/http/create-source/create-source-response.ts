import type { ResultHttpMapping } from '@/interface/http/result-to-http';
import { HTTP_CONFLICT, HTTP_CREATED } from '@/interface/http/status-code';
import type { CreatedSource } from '@/kairos/source/create-source/create-source';
import type { SourceAppIdentifierConflictError } from '@/kairos/source/domain/errors';
import { sourceAppIdentifierConflictError } from '@/kairos/source/domain/errors';

export const createSourceResponse: ResultHttpMapping<CreatedSource, SourceAppIdentifierConflictError> = {
  success: {
    status: HTTP_CREATED,
  },
  error: {
    byType: {
      [sourceAppIdentifierConflictError.type]: {
        status: HTTP_CONFLICT,
      },
    },
  },
};
