import { ok } from '@/kairos/shared/result/ok';
import { makeCreateSource } from '@/kairos/source/create-source/create-source';
import type { InsertSource } from '@/kairos/source/create-source/insert-source.type';
import { describe, expect, test, vi } from 'vitest';

describe('Create source', () => {
  test('requires workspace context and generates a one-time write key', async () => {
    const insertSource: InsertSource = vi.fn().mockResolvedValue(
      ok({
        id: 'source-123',
        description: 'Production customer data',
        environments: ['production', 'staging'],
        labels: ['customer-data', 'web'],
        name: 'web',
        workspaceId: 'workspace-123',
      }),
    );
    const createSource = makeCreateSource({
      generateWriteKey: () => 'write-key-123',
      insertSource,
    });

    const result = await createSource({
      description: 'Production customer data',
      environments: ['production', 'staging'],
      labels: ['customer-data', 'web'],
      name: 'web',
      workspaceId: 'workspace-123',
    });

    expect(insertSource).toHaveBeenCalledWith({
      description: 'Production customer data',
      environments: ['production', 'staging'],
      labels: ['customer-data', 'web'],
      name: 'web',
      workspaceId: 'workspace-123',
      writeKey: 'write-key-123',
    });
    expect(result).toEqual({
      isOk: true,
      value: {
        id: 'source-123',
        description: 'Production customer data',
        environments: ['production', 'staging'],
        labels: ['customer-data', 'web'],
        name: 'web',
        workspaceId: 'workspace-123',
        write_key: 'write-key-123',
      },
    });
  });
});
