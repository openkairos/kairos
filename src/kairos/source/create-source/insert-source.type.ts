import type { Result } from '@/kairos/shared/result/result.type';
import type { SourceAppIdentifierConflictError } from '@/kairos/source/domain/errors';
import type { InitialSource } from '@/kairos/source/domain/initialize-source';
import type { Source } from '@/kairos/source/domain/source.type';

type InsertSourceResult = Result<Source, SourceAppIdentifierConflictError>;

export type InsertSource = (source: InitialSource) => Promise<InsertSourceResult>;
