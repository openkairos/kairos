import { mapResultToHttp } from '@/interface/http/map-result-to-http';
import type { CreateSourceRequest } from '@/kairos/source/adapter/http/create-source/create-source-request';
import { createSourceResponse } from '@/kairos/source/adapter/http/create-source/create-source-response';
import { createSource } from '@/kairos/source/create-source/create-source.compose';
import type { HttpScope } from '@koala-ts/framework';

export async function createSourceController({ request, response }: HttpScope): Promise<void> {
  const params = request.params as CreateSourceRequest['params'];
  const body = request.body as CreateSourceRequest['body'];

  const result = await createSource({
    workspaceId: params.workspaceId,
    name: body.name,
    description: body.description,
    appIdentifier: body.appIdentifier,
  });

  const http = mapResultToHttp(result, createSourceResponse);

  response.status = http.status;
  response.body = http.body;
}
