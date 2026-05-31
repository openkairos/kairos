import { err } from '@/kairos/shared/result/err';
import { ok } from '@/kairos/shared/result/ok';
import { makeCreateWorkspace } from '@/kairos/workspace/application/create-workspace';
import type { InsertWorkspace } from '@/kairos/workspace/application/insert-workspace.type';
import { workspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import { describe, expect, test, vi } from 'vitest';

describe('Create workspace use case', () => {
  test('creates workspace when slug does not exist', async () => {
    const insertWorkspace: InsertWorkspace = vi.fn().mockResolvedValue(
      ok({
        id: 'workspace-id',
        environments: ['dev', 'prod'],
        name: 'Acme',
        slug: 'acme',
      }),
    );
    const execute = makeCreateWorkspace(insertWorkspace);
    const command = {
      environments: ['dev', 'prod'],
      name: 'Acme',
      slug: 'acme',
    };

    const result = await execute(command);

    expect(insertWorkspace).toHaveBeenCalledWith({
      environments: ['dev', 'prod'],
      name: 'Acme',
      slug: 'acme',
    });
    expect(result).toEqual(
      ok({
        id: 'workspace-id',
        environments: ['dev', 'prod'],
        name: 'Acme',
        slug: 'acme',
      }),
    );
  });

  test('returns conflict when slug already exists', async () => {
    const insertWorkspace: InsertWorkspace = vi.fn().mockResolvedValue(err(workspaceSlugConflictError));
    const execute = makeCreateWorkspace(insertWorkspace);
    const command = {
      environments: ['dev', 'prod'],
      name: 'Acme',
      slug: 'acme',
    };

    const result = await execute(command);

    expect(insertWorkspace).toHaveBeenCalledWith({
      environments: ['dev', 'prod'],
      name: 'Acme',
      slug: 'acme',
    });
    expect(result).toEqual(err(workspaceSlugConflictError));
  });
});
