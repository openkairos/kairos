export const workspaceSlugConflictError = {
  type: 'WORKSPACE_SLUG_CONFLICT',
  message: 'Workspace slug already exists',
} as const;

export type WorkspaceSlugConflictError = typeof workspaceSlugConflictError;
