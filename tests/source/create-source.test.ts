import { appConfig } from '@/config';

import { sourcesCollection } from '@/framework/mongodb/collection/sources-collection';
import { workspacesCollection } from '@/framework/mongodb/collection/workspaces-collection';
import { createTestAgent } from '@koala-ts/framework';
import { integrationTest } from '@tests/__vitest__/integration-test';
import { ObjectId } from 'mongodb';
import { describe, expect, test } from 'vitest';

type SourceResponseFields = {
  appIdentifier: string;
  description?: string;
  name: string;
  workspaceId: string;
};

async function createWorkspace(name = 'Acme', slug = 'acme'): Promise<string> {
  const inserted = await workspacesCollection.insertOne({
    environments: ['default'],
    name,
    slug,
  });

  return inserted.insertedId.toHexString();
}

async function expectSourceCreated(response: { status: number; body: unknown }, expectedSource: SourceResponseFields) {
  const persistedSource = await sourcesCollection.findOne({
    app_identifier: expectedSource.appIdentifier,
    workspace_id: new ObjectId(expectedSource.workspaceId),
  });

  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    data: {
      id: expect.any(String),
      ...expectedSource,
      description: expectedSource.description ?? null,
      writeKey: expect.any(String),
    },
  });
  expect(response.body).not.toHaveProperty('data.writeKeyHash');
  expect(persistedSource).toEqual(
    expect.objectContaining({
      app_identifier: expectedSource.appIdentifier,
      name: expectedSource.name,
      workspace_id: new ObjectId(expectedSource.workspaceId),
      write_key_hash: expect.any(String),
    }),
  );
  expect(persistedSource).not.toHaveProperty('write_key');

  if (expectedSource.description === undefined) {
    expect(persistedSource).toEqual(expect.objectContaining({ description: null }));

    return;
  }

  expect(persistedSource).toEqual(expect.objectContaining({ description: expectedSource.description }));
}

describe('Source feature test', () => {
  integrationTest();

  describe('creating a source', () => {
    test('it should create source', async () => {
      const agent = createTestAgent(appConfig);
      const workspaceId = await createWorkspace();
      const payload = {
        name: 'Acme iOS',
        description: 'iOS app',
        appIdentifier: 'com.acme.ios',
      };

      const response = await agent.post(`/api/v1/workspaces/${workspaceId}/sources`).send(payload);

      await expectSourceCreated(response, {
        workspaceId,
        name: 'Acme iOS',
        description: 'iOS app',
        appIdentifier: 'com.acme.ios',
      });
    });

    test('it should create source without description', async () => {
      const agent = createTestAgent(appConfig);
      const workspaceId = await createWorkspace();
      const payload = {
        name: 'Acme Android',
        appIdentifier: 'com.acme.android',
      };

      const response = await agent.post(`/api/v1/workspaces/${workspaceId}/sources`).send(payload);

      await expectSourceCreated(response, {
        workspaceId,
        name: 'Acme Android',
        appIdentifier: 'com.acme.android',
      });
    });
  });

  describe('conflicts', () => {
    test('it should reject duplicate app identifier in same workspace', async () => {
      const agent = createTestAgent(appConfig);
      const workspaceId = await createWorkspace();
      await sourcesCollection.insertOne({
        workspace_id: new ObjectId(workspaceId),
        name: 'Acme iOS',
        description: null,
        app_identifier: 'com.acme.app',
        write_key_hash: 'hashed-write-key',
      });
      const payload = {
        name: 'Acme Android',
        appIdentifier: 'com.acme.app',
      };

      const response = await agent.post(`/api/v1/workspaces/${workspaceId}/sources`).send(payload);

      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        type: 'SOURCE_APP_IDENTIFIER_CONFLICT',
        message: 'Source app identifier already exists in workspace',
      });
    });

    test('it should allow same app identifier in different workspaces', async () => {
      const agent = createTestAgent(appConfig);
      const firstWorkspaceId = await createWorkspace('Acme', 'acme');
      const secondWorkspaceId = await createWorkspace('Globex', 'globex');
      await sourcesCollection.insertOne({
        workspace_id: new ObjectId(firstWorkspaceId),
        name: 'Acme iOS',
        description: null,
        app_identifier: 'com.acme.app',
        write_key_hash: 'hashed-write-key',
      });
      const payload = {
        name: 'Globex iOS',
        appIdentifier: 'com.acme.app',
      };

      const response = await agent.post(`/api/v1/workspaces/${secondWorkspaceId}/sources`).send(payload);

      await expectSourceCreated(response, {
        workspaceId: secondWorkspaceId,
        name: 'Globex iOS',
        appIdentifier: 'com.acme.app',
      });
    });
  });

  describe('request validation', () => {
    test('it should validate create source request', async () => {
      const agent = createTestAgent(appConfig);
      const workspaceId = await createWorkspace();

      const response = await agent.post(`/api/v1/workspaces/${workspaceId}/sources`).send({});

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveProperty('name', ['This value should not be blank.']);
      expect(response.body.errors).toHaveProperty('appIdentifier', ['This value should not be blank.']);
    });
  });
});
