import { mapResultToHttp } from '@/interface/http/map-result-to-http';
import { type CreateWorkspaceRequest } from '@/kairos/workspace/adapter/http/request/create-workspace-request';
import { createWorkspaceResponse } from '@/kairos/workspace/adapter/http/response/create-workspace-response';
import { createWorkspace } from '@/kairos/workspace/create-workspace/create-worskpace.compose';
import { type HttpScope } from '@koala-ts/framework';

export async function createWorkspaceController({ response, request }: HttpScope): Promise<void> {
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
