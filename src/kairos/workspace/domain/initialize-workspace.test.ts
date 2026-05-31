import { initializeWorkspace } from '@/kairos/workspace/domain/initialize-workspace';
import { describe, expect, test } from 'vitest';

describe('Workspace', () => {
  test('initializes workspace with provided environments', () => {
    const workspace = initializeWorkspace({
      environments: ['dev', 'prod'],
      name: 'Acme',
      slug: 'acme',
    });

    expect(workspace).toEqual({
      environments: ['dev', 'prod'],
      name: 'Acme',
      slug: 'acme',
    });
  });

  test('initializes workspace with default environment when environments are missing', () => {
    const workspace = initializeWorkspace({
      name: 'Acme',
      slug: 'acme',
    });

    expect(workspace).toEqual({
      environments: ['default'],
      name: 'Acme',
      slug: 'acme',
    });
  });

  test('initializes workspace with default environment when environments are empty', () => {
    const workspace = initializeWorkspace({
      environments: [],
      name: 'Acme',
      slug: 'acme',
    });

    expect(workspace).toEqual({
      environments: ['default'],
      name: 'Acme',
      slug: 'acme',
    });
  });
});
