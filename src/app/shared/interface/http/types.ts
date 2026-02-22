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

export type ValidationRules = Record<string, string[]>;

export interface ValidationViolation {
  path: string;
  message: string;
  constraint: string;
  value: unknown;
}

export type Validator = (payload: Record<string, unknown>, rules: ValidationRules) => ValidationViolation[];

export type ViolationMapper = (violations: ValidationViolation[]) => Record<string, string[] | string>;
