import { describe, expect, it } from 'vitest';
import { workspaceContextFromRequest } from '@/modules/shared/control-plane/workspace-context';

describe('Workspace context', () => {
  it('uses workspace context already attached to the request', () => {
    const context = workspaceContextFromRequest({
      context: {
        workspace: {
          workspaceId: 'workspace-from-context',
        },
      },
      body: {
        workspace_id: 'workspace-from-body',
      },
    });

    expect(context).toEqual({
      workspaceId: 'workspace-from-context',
    });
  });

  it('can derive workspace context from a control-plane header', () => {
    const context = workspaceContextFromRequest({
      headers: {
        'x-workspace-id': 'workspace-from-header',
      },
    });

    expect(context).toEqual({
      workspaceId: 'workspace-from-header',
    });
  });

  it('can derive workspace context from path parameters', () => {
    const context = workspaceContextFromRequest({
      params: {
        workspaceId: 'workspace-from-path',
      },
    });

    expect(context).toEqual({
      workspaceId: 'workspace-from-path',
    });
  });

  it('does not trust workspace ownership from request body input', () => {
    const context = workspaceContextFromRequest({
      body: {
        workspace_id: 'workspace-from-body',
      },
    });

    expect(context).toBeUndefined();
  });
});
