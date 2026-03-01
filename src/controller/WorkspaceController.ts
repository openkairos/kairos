import { type HttpScope, Route } from '@koala-ts/framework';
import { type CreateWorkspaceRequest } from '@/app/workspace/interface/http/create-workspace-request';
import { createWorkspaceResponse } from '@/app/workspace/interface/http/create-workspace-response';
import { mapResultToHttp } from '@/composition/shared/http/normalization';
import { createWorkspaceHandler, validateCreateWorkspaceRequest } from '@/composition/workspace/create-workspace';

export class WorkspaceController {
  @Route({ method: 'POST', path: '/api/v1/workspaces', middleware: [validateCreateWorkspaceRequest] })
  async create({ response, request }: HttpScope<CreateWorkspaceRequest>): Promise<void> {
    const result = await createWorkspaceHandler(request.body);

    const http = mapResultToHttp(result, createWorkspaceResponse);

    response.status = http.status;
    response.body = http.body;
  }
}
