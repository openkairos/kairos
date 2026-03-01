export interface WorkspaceSlugConflictError {
  type: 'WORKSPACE_SLUG_CONFLICT';
  message: 'Workspace slug already exists';
}

export const workspaceSlugConflictError: WorkspaceSlugConflictError = {
  type: 'WORKSPACE_SLUG_CONFLICT',
  message: 'Workspace slug already exists',
};
