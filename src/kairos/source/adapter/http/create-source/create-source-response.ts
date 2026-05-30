import { type ResultHttpMapping } from '@/interface/http/result-to-http';
import { HTTP_CONFLICT, HTTP_CREATED } from '@/interface/http/status-code';
import type { CreatedSource } from '@/kairos/source/create-source/create-source';
import type { SourceNameConflictError } from '@/kairos/source/domain/errors';

export const createSourceResponse: ResultHttpMapping<CreatedSource, SourceNameConflictError> = {
  success: {
    status: HTTP_CREATED,
  },
  error: {
    byType: {
      SOURCE_NAME_CONFLICT: {
        status: HTTP_CONFLICT,
      },
    },
  },
};
