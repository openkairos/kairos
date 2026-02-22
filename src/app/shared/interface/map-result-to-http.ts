import { isErr, type Result } from '@/app/shared/application/util/result';
import { type StatusCode } from '@/app/shared/interface/status-code';

export interface HttpResponsePayload {
  status: StatusCode;
  body: unknown;
}

export interface Mapper<T, E> {
  onOk: (value: T) => HttpResponsePayload;
  onErr: (error: E) => HttpResponsePayload;
}

export function mapResultToHttp<T, E>(result: Result<T, E>, mapper: Mapper<T, E>): HttpResponsePayload {
  return isErr(result) ? mapper.onErr(result.error) : mapper.onOk(result.value);
}
