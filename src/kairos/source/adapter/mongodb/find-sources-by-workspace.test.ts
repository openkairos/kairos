import { sourcesCollection } from '@/framework/mongodb/collection/sources-collection';
import { findSourcesByWorkspaceInMongoDB } from '@/kairos/source/adapter/mongodb/find-sources-by-workspace';
import { integrationTest } from '@tests/__vitest__/integration-test';
import { ObjectId } from 'mongodb';
import { describe, expect, test } from 'vitest';

describe('Find sources by workspace in MongoDB', () => {
  integrationTest();

  test('filters sources by workspace context', async () => {
    const workspaceId = new ObjectId();
    const otherWorkspaceId = new ObjectId();
    await sourcesCollection.insertMany([
      {
        description: 'Production customer data',
        environments: ['production', 'staging'],
        labels: ['customer-data', 'web'],
        name: 'web',
        write_key: 'write-key-123',
        workspace_id: workspaceId,
      },
      {
        description: 'Mobile customer data',
        environments: ['production'],
        labels: ['customer-data', 'mobile'],
        name: 'mobile',
        write_key: 'write-key-456',
        workspace_id: otherWorkspaceId,
      },
    ]);
    const findSourcesByWorkspace = findSourcesByWorkspaceInMongoDB(sourcesCollection);

    const result = await findSourcesByWorkspace(workspaceId.toHexString());

    expect(result).toEqual([
      {
        id: expect.any(String),
        description: 'Production customer data',
        environments: ['production', 'staging'],
        labels: ['customer-data', 'web'],
        name: 'web',
        workspaceId: workspaceId.toHexString(),
      },
    ]);
  });
});
