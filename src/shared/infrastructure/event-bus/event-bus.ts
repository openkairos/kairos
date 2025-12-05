import { createStore, type HttpRequest, type HttpResponse, type HttpScope, type NextMiddleware, type ScopeStore } from '@koala-ts/framework';
import { type EventEmitter } from '@/shared/application/event-bus';
import { type EventBusStorage } from '@/shared/infrastructure/event-bus/types';

const eventBusStorage = createStore<EventBusStorage>();

export async function eventBusMiddleware(
  scope: HttpScope,
  next: NextMiddleware,
  storage: ScopeStore<EventBusStorage> = eventBusStorage,
): Promise<void> {
  await storage.run({ emitter: scope.app, scope }, next);
}

export function useEmit(storage: ScopeStore<EventBusStorage> = eventBusStorage): EventEmitter {
  return storage.get('emitter');
}

export function useRequest(storage: ScopeStore<EventBusStorage> = eventBusStorage): HttpRequest {
  return storage.get('scope').request;
}

export function useResponse(storage: ScopeStore<EventBusStorage> = eventBusStorage): HttpResponse {
  return storage.get('scope').response;
}
