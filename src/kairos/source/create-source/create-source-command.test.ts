import { toInitializeSourceProps } from '@/kairos/source/create-source/create-source-command';
import { describe, expect, test } from 'vitest';

describe('Create source command', () => {
  test('converts command and write key hash to initialize source props', () => {
    const props = toInitializeSourceProps(
      {
        workspaceId: 'workspace-id',
        name: 'Acme iOS',
        description: 'iOS app',
        appIdentifier: 'com.acme.ios',
      },
      'write-key-hash',
    );

    expect(props).toEqual({
      workspaceId: 'workspace-id',
      name: 'Acme iOS',
      description: 'iOS app',
      appIdentifier: 'com.acme.ios',
      writeKeyHash: 'write-key-hash',
    });
  });

  test('keeps missing description undefined for domain initialization', () => {
    const props = toInitializeSourceProps(
      {
        workspaceId: 'workspace-id',
        name: 'Acme iOS',
        appIdentifier: 'com.acme.ios',
      },
      'write-key-hash',
    );

    expect(props).toEqual({
      workspaceId: 'workspace-id',
      name: 'Acme iOS',
      description: undefined,
      appIdentifier: 'com.acme.ios',
      writeKeyHash: 'write-key-hash',
    });
  });
});
