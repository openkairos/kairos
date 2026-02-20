import { type HttpScope, type NextMiddleware } from '@koala-ts/framework';

export async function renderHttpError(scope: HttpScope, next: NextMiddleware): Promise<void> {
  try {
    await next();
  } catch (error) {
    if (!isHttpError(error)) throw error;

    scope.response.status = error.status;
    scope.response.body = JSON.stringify(error);
    scope.response.withHeaders({ 'Content-Type': 'application/json' });
  }
}

function isHttpError(
  error: unknown,
): error is { status: number; expose: boolean; errors: Record<string, string[] | string> } {
  if (!isRecord(error)) return false;

  const { status, expose, errors } = error;

  return typeof status === 'number' && expose === true && isRecord(errors);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}
