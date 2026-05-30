import { workspacesCollection } from '@/kairos/shared/persistence/mongodb/mongodb-composition';
import type { WorkspacesCollection } from '@/kairos/shared/persistence/mongodb/workspaces-collection-schema';
import { workspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import { createSaveWorkspace } from '@/kairos/workspace/infrastructure/repository/save-workspace';
import { expectAsyncToThrow } from '@tests/__vitest__/expect-async-to-throw';
import { integrationTest } from '@tests/__vitest__/integration-test';
import { MongoServerError } from 'mongodb';
import { describe, expect, test, vi } from 'vitest';

describe('Save Workspace Repository', () => {
  integrationTest();

  test('creates workspace when slug does not exist', async () => {
    const saveWorkspace = createSaveWorkspace({ workspacesCollection });
    const command = {
      environments: ['dev', 'prod'],
      name: 'Acme',
      slug: 'acme',
    };

    const result = await saveWorkspace(command);

    const persistedWorkspace = await workspacesCollection.findOne({ slug: command.slug });
    expect(result).toEqual({
      isOk: true,
      value: {
        id: expect.any(String),
        environments: ['dev', 'prod'],
        name: 'Acme',
        slug: 'acme',
      },
    });
    expect(persistedWorkspace).toEqual(
      expect.objectContaining({
        environments: ['dev', 'prod'],
        name: 'Acme',
        slug: 'acme',
      }),
    );
  });

  test('returns conflict when slug already exists', async () => {
    const saveWorkspace = createSaveWorkspace({ workspacesCollection });
    await saveWorkspace({
      environments: ['dev'],
      name: 'Acme',
      slug: 'acme',
    });
    const command = {
      environments: ['staging'],
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
      insertOne: vi.fn().mockRejectedValue(failure),
    };
    const saveWorkspace = createSaveWorkspace({
      workspacesCollection: collectionMock as unknown as WorkspacesCollection,
    });

    await expectAsyncToThrow(
      saveWorkspace({
        environments: ['dev'],
        name: 'Test',
        slug: 'test',
      }),
      failure,
    );
  });
});
