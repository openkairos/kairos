import { type HttpScope } from '@koala-ts/framework';
import { type CreateWorkspaceRequest } from '@/app/workspace/interface/http/create-workspace-request';
import { createWorkspaceResponse } from '@/app/workspace/interface/http/create-workspace-response';
import { mapResultToHttp } from '@/app/shared/http';
import { createWorkspace } from '@/app/workspace/workspace-composition';

export async function createWorkspaceHandler({ response, request }: HttpScope): Promise<void> {
  const result = await createWorkspace(request.body as CreateWorkspaceRequest['body']);

  const http = mapResultToHttp(result, createWorkspaceResponse);

  response.status = http.status;
  response.body = http.body;
}
