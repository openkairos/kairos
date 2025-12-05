import { type HttpScope, type ScopeStore } from '@koala-ts/framework';
import { describe, expect, test, vi } from 'vitest';
import { eventBusMiddleware, useEmit, useRequest, useResponse } from './event-bus';
import { type EventBusStorage } from './types';

describe('Event bus', () => {
  test('middleware should init storage', async () => {
    const scope = { app: vi.fn() };
    const next = vi.fn();
    const storage = { run: vi.fn() };

    await eventBusMiddleware(scope as unknown as HttpScope, next, storage as unknown as ScopeStore<EventBusStorage>);

    expect(storage.run).toHaveBeenCalledWith({ emitter: scope.app, scope }, next);
  });

  test('useEmit should return emitter from storage', () => {
    const storage = { get: vi.fn().mockReturnValue('emitter') };

    const emitter = useEmit(storage as unknown as ScopeStore<EventBusStorage>);

    expect(storage.get).toHaveBeenCalledWith('emitter');
    expect(emitter).toBe('emitter');
  });

  test('useRequest should return request from storage', () => {
    const request = { headers: { host: 'localhost' } };
    const storage = { get: vi.fn().mockReturnValue({ request }) };

    const req = useRequest(storage as unknown as ScopeStore<EventBusStorage>);

    expect(storage.get).toHaveBeenCalledWith('scope');
    expect(req).toBe(request);
  });

  test('useResponse should return response from storage', () => {
    const response = { status: 200, body: 'OK' };
    const storage = { get: vi.fn().mockReturnValue({ response }) };

    const res = useResponse(storage as unknown as ScopeStore<EventBusStorage>);

    expect(storage.get).toHaveBeenCalledWith('scope');
    expect(res).toBe(response);
  });
});
