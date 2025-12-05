import type { HttpScope } from '@koala-ts/framework';
import type { EventEmitter } from '@/shared/application/event-bus';

export interface EventBusStorage {
  emitter: EventEmitter,
  scope: HttpScope,
}
