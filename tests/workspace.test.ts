import { createTestAgent } from '@koala-ts/framework';
import { integrationTest } from '@tests/__vitest__/integration-test';
import { describe, expect, test } from 'vitest';
import { workspacesCollection } from '@/app/shared/persistence/mongodb';
import { appConfig } from '@/config';

describe('Workspace feature test', () => {
  integrationTest();

  test('it should create workspace', async () => {
    const agent = createTestAgent(appConfig);
    const payload = {
      name: 'Acme',
      slug: 'acme',
    };

    const response = await agent.post('/api/v1/workspaces').send(payload);

    const persistedWorkspace = await workspacesCollection.findOne({ slug: payload.slug });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      data: {
        id: expect.any(String),
        name: 'Acme',
        slug: 'acme',
      },
    });
    expect(persistedWorkspace).toEqual(
      expect.objectContaining({
        name: 'Acme',
        slug: 'acme',
      }),
    );
  });

  test('it should reject creating workspace with duplicated slug', async () => {
    const agent = createTestAgent(appConfig);
    await workspacesCollection.insertOne({
      name: 'Acme',
      slug: 'acme',
    });
    const payload = {
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

  test('it should validate create workspace request', async () => {
    const agent = createTestAgent(appConfig);

    const response = await agent.post('/api/v1/workspaces').send({});

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveProperty('name', ['This value should not be blank.']);
    expect(response.body.errors).toHaveProperty('slug', ['This value should not be blank.']);
  });
});
