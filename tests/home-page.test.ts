import { type TestAgent } from '@koala-ts/framework';
import { createTestAgent } from '@koala-ts/framework/dist/Testing/TestAgentFactory';
import { beforeEach, describe, test } from 'vitest';
import { appConfig } from '../src/config';

describe('Home Page', function() {
  let agent: TestAgent;

  beforeEach(function() {
    agent = createTestAgent(appConfig);
  });

  test('it should return welcome message', function() {
    return agent.get('/').expect(200, 'KoalaTS: Effortlessly elegant, relentlessly efficient. 🎩🐨');
  });
});
