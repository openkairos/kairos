import { expectAsyncToThrow } from '@tests/__vitest__/expect-async-to-throw';
import { integrationTest } from '@tests/__vitest__/integration-test';
import { MongoServerError } from 'mongodb';
import { describe, expect, test, vi } from 'vitest';
import type { WorkspacesCollection } from '@/app/shared/infrastructure/persistence/mongodb/workspaces-collection-schema';
import { createSaveWorkspace } from '@/app/shared/infrastructure/persistence/repository/workspace-repository/save-workspace';
import { workspaceSlugConflictError } from '@/app/workspace/domain/errors';
import { workspacesCollection } from '@/app/shared/infrastructure/persistence/mongodb';

describe('Save Workspace Repository', () => {
  integrationTest();

  test('creates workspace when slug does not exist', async () => {
    const saveWorkspace = createSaveWorkspace({ workspacesCollection });
    const command = {
      name: 'Acme',
      slug: 'acme',
    };

    const result = await saveWorkspace(command);

    const persistedWorkspace = await workspacesCollection.findOne({ slug: command.slug });
    expect(result).toEqual({
      isOk: true,
      value: {
        id: expect.any(String),
        name: 'Acme',
        slug: 'acme',
      },
    });
    expect(persistedWorkspace).toEqual(
      expect.objectContaining({
        name: 'Acme',
        slug: 'acme',
      }),
    );
  });

  test('returns conflict when slug already exists', async () => {
    const saveWorkspace = createSaveWorkspace({ workspacesCollection });
    await saveWorkspace({
      name: 'Acme',
      slug: 'acme',
    });
    const command = {
      name: 'Another Acme',
      slug: 'acme',
    };

    const result = await saveWorkspace(command);

    expect(result).toEqual({
      isOk: false,
      error: workspaceSlugConflictError,
    });
  });

  test.each([
    ['generic error', new Error('Database error')],
    [
      'mongo server error with non duplicate code',
      new MongoServerError({
        message: 'Write conflict',
        code: 112,
      }),
    ],
  ])('it should throw non duplicate errors: %s', async (_, failure) => {
    const collectionMock = {
      createIndex: vi.fn().mockResolvedValue('slug_1'),
      insertOne: vi.fn().mockRejectedValue(failure),
    };
    const saveWorkspace = createSaveWorkspace({
      workspacesCollection: collectionMock as unknown as WorkspacesCollection,
    });

    await expectAsyncToThrow(
      saveWorkspace({
        name: 'Test',
        slug: 'test',
      }),
      failure,
    );
  });
});
