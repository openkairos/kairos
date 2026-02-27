import { createTestAgent, type TestAgent } from '@koala-ts/framework';
import { beforeEach, describe, test } from 'vitest';
import { appConfig } from '../src/config';

describe('Home Page', function () {
  let agent: TestAgent;

  beforeEach(function () {
    agent = createTestAgent(appConfig);
  });

  test('it should return welcome message', function () {
    return agent.get('/').expect(200, 'Kairos: The right moment for customer data.');
  });
});
