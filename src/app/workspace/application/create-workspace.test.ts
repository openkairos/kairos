import { describe, expect, test, vi } from 'vitest';
import { err, ok } from '@/app/shared/application/result';
import { createCreateWorkspace } from '@/app/workspace/application/create-workspace';
import { workspaceSlugConflictError } from '@/app/workspace/domain/errors';
import type { SaveWorkspace } from '@/app/workspace/domain/workspace-repository';

describe('Create workspace use case', () => {
  test('creates workspace when slug does not exist', async () => {
    const saveWorkspace: SaveWorkspace = vi.fn().mockResolvedValue(
      ok({
        id: 'workspace-id',
        name: 'Acme',
        slug: 'acme',
      }),
    );
    const execute = createCreateWorkspace({ saveWorkspace });
    const command = {
      name: 'Acme',
      slug: 'acme',
    };

    const result = await execute(command);

    expect(saveWorkspace).toHaveBeenCalledWith({
      name: 'Acme',
      slug: 'acme',
    });
    expect(result).toEqual(
      ok({
        id: 'workspace-id',
        name: 'Acme',
        slug: 'acme',
      }),
    );
  });

  test('returns conflict when slug already exists', async () => {
    const saveWorkspace: SaveWorkspace = vi.fn().mockResolvedValue(err(workspaceSlugConflictError));
    const execute = createCreateWorkspace({ saveWorkspace });
    const command = {
      name: 'Acme',
      slug: 'acme',
    };

    const result = await execute(command);

    expect(saveWorkspace).toHaveBeenCalledWith({
      name: 'Acme',
      slug: 'acme',
    });
    expect(result).toEqual(err(workspaceSlugConflictError));
  });
});
