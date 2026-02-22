export interface EventEmitter {
  emit(event: string, ...args: unknown[]): void;
}
