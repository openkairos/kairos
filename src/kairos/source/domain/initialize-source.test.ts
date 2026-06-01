import { initializeSource } from '@/kairos/source/domain/initialize-source';
import { describe, expect, test } from 'vitest';

describe('Source', () => {
  test('initializes source with description', () => {
    const source = initializeSource({
      workspaceId: 'workspace-id',
      name: 'Acme iOS',
      description: 'iOS app',
      appIdentifier: 'com.acme.ios',
      writeKeyHash: 'write-key-hash',
    });

    expect(source).toEqual({
      workspaceId: 'workspace-id',
      name: 'Acme iOS',
      description: 'iOS app',
      appIdentifier: 'com.acme.ios',
      writeKeyHash: 'write-key-hash',
    });
  });

  test('initializes source with null description when description is missing', () => {
    const source = initializeSource({
      workspaceId: 'workspace-id',
      name: 'Acme iOS',
      appIdentifier: 'com.acme.ios',
      writeKeyHash: 'write-key-hash',
    });

    expect(source).toEqual({
      workspaceId: 'workspace-id',
      name: 'Acme iOS',
      description: null,
      appIdentifier: 'com.acme.ios',
      writeKeyHash: 'write-key-hash',
    });
  });
});
