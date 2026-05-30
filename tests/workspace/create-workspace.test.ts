import { appConfig } from '@/config';

import { workspacesCollection } from '@/kairos/shared/infrastructure/mongodb/collection/workspaces-collection';
import { createTestAgent } from '@koala-ts/framework';
import { integrationTest } from '@tests/__vitest__/integration-test';
import { describe, expect, test } from 'vitest';

type WorkspaceFields = {
  environments: string[];
  name: string;
  slug: string;
};

async function expectWorkspaceCreated(response: { status: number; body: unknown }, expectedWorkspace: WorkspaceFields) {
  const persistedWorkspace = await workspacesCollection.findOne({ slug: expectedWorkspace.slug });
  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    data: {
      id: expect.any(String),
      ...expectedWorkspace,
    },
  });
  expect(persistedWorkspace).toEqual(expect.objectContaining(expectedWorkspace));
}

describe('Workspace feature test', () => {
  integrationTest();

  describe('creating a workspace', () => {
    test('it should create workspace', async () => {
      const agent = createTestAgent(appConfig);
      const payload = {
        environments: ['dev', 'prod'],
        name: 'Acme',
        slug: 'acme',
      };

      const response = await agent.post('/api/v1/workspaces').send(payload);

      await expectWorkspaceCreated(response, {
        environments: ['dev', 'prod'],
        name: 'Acme',
        slug: 'acme',
      });
    });
  });

  describe('default environments', () => {
    test('it should default environments to default when omitted', async () => {
      const agent = createTestAgent(appConfig);
      const payload = {
        name: 'Acme',
        slug: 'acme',
      };

      const response = await agent.post('/api/v1/workspaces').send(payload);

      await expectWorkspaceCreated(response, {
        environments: ['default'],
        name: 'Acme',
        slug: 'acme',
      });
    });

    test('it should default environments to default when empty array is provided', async () => {
      const agent = createTestAgent(appConfig);
      const payload = {
        environments: [],
        name: 'Acme',
        slug: 'acme',
      };

      const response = await agent.post('/api/v1/workspaces').send(payload);

      await expectWorkspaceCreated(response, {
        environments: ['default'],
        name: 'Acme',
        slug: 'acme',
      });
    });
  });

  describe('conflicts', () => {
    test('it should reject creating workspace with duplicated slug', async () => {
      const agent = createTestAgent(appConfig);
      await workspacesCollection.insertOne({
        environments: ['dev'],
        name: 'Acme',
        slug: 'acme',
      });
      const payload = {
        environments: ['prod'],
        name: 'Another Acme',
        slug: 'acme',
      };

      const response = await agent.post('/api/v1/workspaces').send(payload);

      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        type: 'WORKSPACE_SLUG_CONFLICT',
        message: 'Workspace slug already exists',
      });
    });
  });

  describe('request validation', () => {
    test('it should validate create workspace request', async () => {
      const agent = createTestAgent(appConfig);

      const response = await agent.post('/api/v1/workspaces').send({});

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveProperty('name', ['This value should not be blank.']);
      expect(response.body.errors).toHaveProperty('slug', ['This value should not be blank.']);
    });

    test('it should reject blank environment names', async () => {
      const agent = createTestAgent(appConfig);
      const payload = {
        environments: [''],
        name: 'Acme',
        slug: 'acme',
      };

      const response = await agent.post('/api/v1/workspaces').send(payload);

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveProperty('environments.0', ['This value should not be blank.']);
    });

    test('it should reject environments when it is not an array', async () => {
      const agent = createTestAgent(appConfig);
      const payload = {
        environments: 'dev',
        name: 'Acme',
        slug: 'acme',
      };

      const response = await agent.post('/api/v1/workspaces').send(payload);

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveProperty('environments');
    });

    test('it should reject non-string environment names', async () => {
      const agent = createTestAgent(appConfig);
      const payload = {
        environments: ['dev', 123],
        name: 'Acme',
        slug: 'acme',
      };

      const response = await agent.post('/api/v1/workspaces').send(payload);

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveProperty('environments.1');
    });

    test('it should reject duplicate environment names', async () => {
      const agent = createTestAgent(appConfig);
      const payload = {
        environments: ['dev', 'dev'],
        name: 'Acme',
        slug: 'acme',
      };

      const response = await agent.post('/api/v1/workspaces').send(payload);

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveProperty('environments');
    });
  });
});
