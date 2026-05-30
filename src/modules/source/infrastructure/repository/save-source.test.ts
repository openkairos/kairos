import { expectAsyncToThrow } from '@tests/__vitest__/expect-async-to-throw';
import { MongoServerError, ObjectId } from 'mongodb';
import { describe, expect, test, vi } from 'vitest';
import type { SourcesCollection } from '@/modules/shared/persistence/mongodb/sources-collection-schema';
import { sourceNameEnvironmentConflictError } from '@/modules/source/domain/errors';
import { createSaveSource } from '@/modules/source/infrastructure/repository/save-source';

describe('Save Source Repository', () => {
  test('creates a source owned by the workspace context', async () => {
    const insertedId = new ObjectId('000000000000000000000001');
    const insertOne = vi.fn().mockResolvedValue({ insertedId });
    const saveSource = createSaveSource({
      sourcesCollection: { insertOne } as unknown as SourcesCollection,
    });

    const result = await saveSource(
      { workspaceId: 'workspace-123' },
      {
        description: 'Production customer data',
        environment: 'production',
        label: 'Production',
        name: 'web',
      },
    );

    expect(insertOne).toHaveBeenCalledWith({
      description: 'Production customer data',
      environment: 'production',
      label: 'Production',
      name: 'web',
      workspace_id: 'workspace-123',
    });
    expect(result).toEqual({
      isOk: true,
      value: {
        id: insertedId.toHexString(),
        description: 'Production customer data',
        environment: 'production',
        label: 'Production',
        name: 'web',
        workspaceId: 'workspace-123',
      },
    });
  });

  test('returns conflict when source name already exists in the workspace environment', async () => {
    const insertOne = vi.fn().mockRejectedValue(
      new MongoServerError({
        message: 'Duplicate key',
        code: 11000,
      }),
    );
    const saveSource = createSaveSource({
      sourcesCollection: { insertOne } as unknown as SourcesCollection,
    });

    const result = await saveSource(
      { workspaceId: 'workspace-123' },
      {
        description: 'Production customer data',
        environment: 'production',
        label: 'Production',
        name: 'web',
      },
    );

    expect(result).toEqual({
      isOk: false,
      error: sourceNameEnvironmentConflictError,
    });
  });

  test('throws non duplicate errors', async () => {
    const failure = new Error('Database error');
    const insertOne = vi.fn().mockRejectedValue(failure);
    const saveSource = createSaveSource({
      sourcesCollection: { insertOne } as unknown as SourcesCollection,
    });

    await expectAsyncToThrow(
      saveSource(
        { workspaceId: 'workspace-123' },
        {
          description: 'Production customer data',
          environment: 'production',
          label: 'Production',
          name: 'web',
        },
      ),
      failure,
    );
  });
});
