import { workspacesCollection } from '@/framework/mongodb/collection/workspaces-collection';
import type { WorkspacesCollection } from '@/framework/mongodb/schema/workspaces-collection-schema';
import { makeInsertWorkspace } from '@/kairos/workspace/adapter/mongodb/insert-workspace';
import { workspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import { expectAsyncToThrow } from '@tests/__vitest__/expect-async-to-throw';
import { integrationTest } from '@tests/__vitest__/integration-test';
import { MongoServerError } from 'mongodb';
import { describe, expect, test, vi } from 'vitest';

describe('Insert workspace into MongoDB', () => {
  integrationTest();

  test('creates workspace when slug does not exist', async () => {
    const insertWorkspace = makeInsertWorkspace(workspacesCollection);
    const command = {
      environments: ['dev', 'prod'],
      name: 'Acme',
      slug: 'acme',
    };

    const result = await insertWorkspace(command);

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
    const insertWorkspace = makeInsertWorkspace(workspacesCollection);
    await insertWorkspace({
      environments: ['dev'],
      name: 'Acme',
      slug: 'acme',
    });
    const command = {
      environments: ['staging'],
      name: 'Another Acme',
      slug: 'acme',
    };

    const result = await insertWorkspace(command);

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
    const insertWorkspace = makeInsertWorkspace(collectionMock as unknown as WorkspacesCollection);

    await expectAsyncToThrow(
      insertWorkspace({
        environments: ['dev'],
        name: 'Test',
        slug: 'test',
      }),
      failure,
    );
  });
});
