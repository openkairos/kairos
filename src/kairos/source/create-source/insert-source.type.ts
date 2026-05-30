import type { Result } from '@/kairos/shared/result/result.type';
import type { SourceNameConflictError } from '@/kairos/source/domain/errors';
import type { InitialSource, Source } from '@/kairos/source/domain/source';

type InsertSourceResult = Result<Source, SourceNameConflictError>;

export type InsertSource = (source: InitialSource) => Promise<InsertSourceResult>;
