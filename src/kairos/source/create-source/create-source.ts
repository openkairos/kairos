import { isErr } from '@/kairos/shared/result/err';
import { ok } from '@/kairos/shared/result/ok';
import type { Result } from '@/kairos/shared/result/result.type';
import { type CreateSourceCommand, toInitializeSourceProps } from '@/kairos/source/create-source/create-source-command';
import type { InsertSource } from '@/kairos/source/create-source/insert-source.type';
import type { SourceAppIdentifierConflictError } from '@/kairos/source/domain/errors';
import { initializeSource } from '@/kairos/source/domain/initialize-source';

export type CreatedSource = Readonly<{
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  appIdentifier: string;
  writeKey: string;
}>;

export type CreateSourceResult = Result<CreatedSource, SourceAppIdentifierConflictError>;

type GenerateWriteKey = () => string;

type HashWriteKey = (writeKey: string) => Promise<string>;

type CreateSourceDependencies = Readonly<{
  insertSource: InsertSource;
  generateWriteKey: GenerateWriteKey;
  hashWriteKey: HashWriteKey;
}>;

export const makeCreateSource =
  ({ insertSource, generateWriteKey, hashWriteKey }: CreateSourceDependencies) =>
  async (command: CreateSourceCommand): Promise<CreateSourceResult> => {
    const writeKey = generateWriteKey();
    const writeKeyHash = await hashWriteKey(writeKey);

    const initialSource = initializeSource(toInitializeSourceProps(command, writeKeyHash));

    const sourceResult = await insertSource(initialSource);
    if (isErr(sourceResult)) return sourceResult;

    const source = sourceResult.value;

    return ok({
      id: source.id,
      workspaceId: source.workspaceId,
      name: source.name,
      description: source.description,
      appIdentifier: source.appIdentifier,
      writeKey,
    });
  };
