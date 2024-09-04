import { DefaultCommand } from '../src/commands/default-command';
import { getSession } from '../src/clarinet-sdk';
import { test, describe, expect } from 'vitest';
import { Config } from '../src/config';

test('getting a session with a project that has testnet requirements', async () => {
  const config = await Config.load('./test/dependencies');
  // console.log('config', config);
  const session = await getSession(config);
  const testContract = session.contracts.find(c => c.contract_id.endsWith('.TB-test-3'));
  expect(testContract).toBeDefined();
  // console.log('session', session);
});
