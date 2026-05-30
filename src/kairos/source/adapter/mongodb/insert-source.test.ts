import { sourcesCollection } from '@/framework/mongodb/collection/sources-collection';
import type { SourcesCollection } from '@/framework/mongodb/schema/sources-collection-schema';
import { insertSourceIntoMongoDB } from '@/kairos/source/adapter/mongodb/insert-source';
import { sourceNameConflictError } from '@/kairos/source/domain/errors';
import { expectAsyncToThrow } from '@tests/__vitest__/expect-async-to-throw';
import { integrationTest } from '@tests/__vitest__/integration-test';
import { ObjectId } from 'mongodb';
import { describe, expect, test, vi } from 'vitest';

describe('Insert source into MongoDB', () => {
  integrationTest();

  test('creates a source owned by the workspace context', async () => {
    const insertSource = insertSourceIntoMongoDB(sourcesCollection);
    const workspaceId = new ObjectId().toHexString();

    const result = await insertSource({
      description: 'Production customer data',
      environments: ['production', 'staging'],
      labels: ['customer-data', 'web'],
      name: 'web',
      workspaceId,
      writeKey: 'write-key-123',
    });

    const persistedSource = await sourcesCollection.findOne({ workspace_id: new ObjectId(workspaceId), name: 'web' });
    expect(result).toEqual({
      isOk: true,
      value: {
        id: expect.any(String),
        description: 'Production customer data',
        environments: ['production', 'staging'],
        labels: ['customer-data', 'web'],
        name: 'web',
        workspaceId,
      },
    });
    expect(persistedSource).toEqual(
      expect.objectContaining({
        description: 'Production customer data',
        environments: ['production', 'staging'],
        labels: ['customer-data', 'web'],
        name: 'web',
        write_key: 'write-key-123',
        workspace_id: new ObjectId(workspaceId),
      }),
    );
  });

  test('returns conflict when source name already exists in the workspace', async () => {
    const insertSource = insertSourceIntoMongoDB(sourcesCollection);
    const workspaceId = new ObjectId().toHexString();
    await insertSource({
      environments: ['production'],
      labels: ['customer-data'],
      name: 'web',
      workspaceId,
      writeKey: 'write-key-123',
    });

    const result = await insertSource({
      environments: ['production', 'staging'],
      labels: ['customer-data', 'web'],
      name: 'web',
      workspaceId,
      writeKey: 'write-key-456',
    });

    expect(result).toEqual({
      isOk: false,
      error: sourceNameConflictError,
    });
  });

  test('throws non duplicate errors', async () => {
    const failure = new Error('Database error');
    const workspaceId = new ObjectId().toHexString();
    const insertOne = vi.fn().mockRejectedValue(failure);
    const insertSource = insertSourceIntoMongoDB({ insertOne } as unknown as SourcesCollection);

    await expectAsyncToThrow(
      insertSource({
        description: 'Production customer data',
        environments: ['production', 'staging'],
        labels: ['customer-data', 'web'],
        name: 'web',
        workspaceId,
        writeKey: 'write-key-123',
      }),
      failure,
    );
  });
});
