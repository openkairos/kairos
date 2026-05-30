import { type HttpScope } from '@koala-ts/framework';
import { type CreateWorkspaceRequest } from '@/kairos/workspace/interface/http/create-workspace-request';
import { createWorkspaceResponse } from '@/kairos/workspace/interface/http/create-workspace-response';
import { mapResultToHttp } from '@/kairos/shared/http/http-composition';
import { createWorkspace } from '@/kairos/workspace/workspace-composition';

export async function createWorkspaceHandler({ response, request }: HttpScope): Promise<void> {
  const body = request.body as CreateWorkspaceRequest['body'];
  const result = await createWorkspace({
    environments: body.environments === undefined || body.environments.length === 0 ? ['default'] : body.environments,
    name: body.name,
    slug: body.slug,
  });

  const http = mapResultToHttp(result, createWorkspaceResponse);

  response.status = http.status;
  response.body = http.body;
}
