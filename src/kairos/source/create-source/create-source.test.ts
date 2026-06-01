import { err } from '@/kairos/shared/result/err';
import { ok } from '@/kairos/shared/result/ok';
import { makeCreateSource } from '@/kairos/source/create-source/create-source';
import type { InsertSource } from '@/kairos/source/create-source/insert-source.type';
import { sourceAppIdentifierConflictError } from '@/kairos/source/domain/errors';
import { describe, expect, test, vi } from 'vitest';

describe('Create source use case', () => {
  test('creates source with null description when description is missing', async () => {
    const insertSource: InsertSource = vi.fn().mockResolvedValue(
      ok({
        id: 'source-id',
        workspaceId: 'workspace-id',
        name: 'Acme iOS',
        description: null,
        appIdentifier: 'com.acme.ios',
        writeKeyHash: 'write-key-hash',
      }),
    );
    const execute = makeCreateSource({
      insertSource,
      generateWriteKey: () => 'write-key',
      hashWriteKey: vi.fn().mockResolvedValue('write-key-hash'),
    });

    const result = await execute({
      workspaceId: 'workspace-id',
      name: 'Acme iOS',
      appIdentifier: 'com.acme.ios',
    });

    expect(insertSource).toHaveBeenCalledWith({
      workspaceId: 'workspace-id',
      name: 'Acme iOS',
      description: null,
      appIdentifier: 'com.acme.ios',
      writeKeyHash: 'write-key-hash',
    });
    expect(result).toEqual(
      ok({
        id: 'source-id',
        workspaceId: 'workspace-id',
        name: 'Acme iOS',
        description: null,
        appIdentifier: 'com.acme.ios',
        writeKey: 'write-key',
      }),
    );
  });

  test('returns conflict when app identifier already exists in workspace', async () => {
    const insertSource: InsertSource = vi.fn().mockResolvedValue(err(sourceAppIdentifierConflictError));
    const execute = makeCreateSource({
      insertSource,
      generateWriteKey: () => 'write-key',
      hashWriteKey: vi.fn().mockResolvedValue('write-key-hash'),
    });

    const result = await execute({
      workspaceId: 'workspace-id',
      name: 'Acme iOS',
      appIdentifier: 'com.acme.ios',
    });

    expect(result).toEqual(err(sourceAppIdentifierConflictError));
  });
});
