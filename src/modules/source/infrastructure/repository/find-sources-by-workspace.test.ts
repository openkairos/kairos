import { ObjectId } from 'mongodb';
import { describe, expect, test, vi } from 'vitest';
import type { SourcesCollection } from '@/modules/shared/persistence/mongodb/sources-collection-schema';
import { createFindSourcesByWorkspace } from '@/modules/source/infrastructure/repository/find-sources-by-workspace';

describe('Find Sources By Workspace Repository', () => {
  test('filters sources by workspace context', async () => {
    const toArray = vi.fn().mockResolvedValue([
      {
        _id: new ObjectId('000000000000000000000001'),
        description: 'Production customer data',
        environment: 'production',
        label: 'Production',
        name: 'web',
        workspace_id: 'workspace-123',
      },
    ]);
    const find = vi.fn().mockReturnValue({ toArray });
    const findSourcesByWorkspace = createFindSourcesByWorkspace({
      sourcesCollection: { find } as unknown as SourcesCollection,
    });

    const result = await findSourcesByWorkspace({ workspaceId: 'workspace-123' });

    expect(find).toHaveBeenCalledWith({ workspace_id: 'workspace-123' });
    expect(result).toEqual([
      {
        id: '000000000000000000000001',
        description: 'Production customer data',
        environment: 'production',
        label: 'Production',
        name: 'web',
        workspaceId: 'workspace-123',
      },
    ]);
  });
});
