import type { Result } from '@/kairos/shared/result/result.type';
import type { CreateSourceCommand } from '@/kairos/source/create-source/create-source-command.type';
import type { InsertSource } from '@/kairos/source/create-source/insert-source.type';
import type { SourceNameConflictError } from '@/kairos/source/domain/errors';
import type { Source } from '@/kairos/source/domain/source';
import { initializeSource } from '@/kairos/source/domain/source';

type GenerateWriteKey = () => string;

export type CreatedSource = Source & {
  write_key: string;
};

export type CreateSourceResult = Result<CreatedSource, SourceNameConflictError>;

export const makeCreateSource =
  (dependencies: Readonly<{ generateWriteKey: GenerateWriteKey; insertSource: InsertSource }>) =>
  async (command: CreateSourceCommand): Promise<CreateSourceResult> => {
    const writeKey = dependencies.generateWriteKey();
    const result = await dependencies.insertSource(
      initializeSource({
        ...command,
        writeKey,
      }),
    );

    if (!result.isOk) return result;

    return {
      isOk: true,
      value: {
        ...result.value,
        write_key: writeKey,
      },
    };
  };
