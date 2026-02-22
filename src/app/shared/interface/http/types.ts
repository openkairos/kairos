export interface HttpRequest {
  body?: Record<string, unknown>;
}

export interface HttpResponse {
  status: number;
  body?: unknown;
}

export interface HttpScope {
  request: HttpRequest;
  response: HttpResponse;
}

export type NextMiddleware = () => Promise<void> | void;

export type HttpMiddleware = (scope: HttpScope, next: NextMiddleware) => Promise<void>;
