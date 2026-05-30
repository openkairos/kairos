import { mapResultToHttp } from '@/interface/http/map-result-to-http';
import type { CreateSourceRequest } from '@/kairos/source/adapter/http/create-source/create-source-request';
import { createSourceResponse } from '@/kairos/source/adapter/http/create-source/create-source-response';
import { createSource } from '@/kairos/source/create-source/create-source.compose';
import { type HttpScope } from '@koala-ts/framework';

export async function createSourceController({ request, response }: HttpScope): Promise<void> {
  const { body, params } = request as CreateSourceRequest;
  const result = await createSource({
    description: body.description,
    environments: body.environments,
    labels: body.labels,
    name: body.name,
    workspaceId: params.workspaceId,
  });

  const http = mapResultToHttp(result, createSourceResponse);

  response.status = http.status;
  response.body = http.body;
}
