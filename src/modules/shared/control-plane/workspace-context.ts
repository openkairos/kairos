export interface WorkspaceContext {
  workspaceId: string;
}

type HeaderValue = string | readonly string[] | undefined;

type WorkspaceContextRequest = Readonly<{
  body?: unknown;
  context?: Readonly<{
    workspace?: WorkspaceContext;
    workspaceContext?: WorkspaceContext;
    workspaceId?: string;
  }>;
  headers?: Readonly<Record<string, HeaderValue>>;
  params?: Readonly<Record<string, string | undefined>>;
}>;

function firstHeaderValue(value: HeaderValue): string | undefined {
  return typeof value === 'string' ? value : value?.[0];
}

function contextFromWorkspaceId(workspaceId: string | undefined): WorkspaceContext | undefined {
  if (workspaceId === undefined) return undefined;

  const normalizedWorkspaceId = workspaceId.trim();
  if (normalizedWorkspaceId.length === 0) return undefined;

  return { workspaceId: normalizedWorkspaceId };
}

export function workspaceContextFromRequest(request: WorkspaceContextRequest): WorkspaceContext | undefined {
  return (
    request.context?.workspace ??
    request.context?.workspaceContext ??
    contextFromWorkspaceId(request.context?.workspaceId) ??
    contextFromWorkspaceId(firstHeaderValue(request.headers?.['x-workspace-id'])) ??
    contextFromWorkspaceId(request.params?.workspaceId) ??
    contextFromWorkspaceId(request.params?.workspace_id)
  );
}
