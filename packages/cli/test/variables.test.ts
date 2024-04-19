import { join } from 'path';
import { Config } from '../src/config';
import { SessionWithVariables, getSession } from '../src/session';
import { test, expect, describe, beforeAll } from 'vitest';

describe('variables', () => {
  let config: Config;
  let session: SessionWithVariables;
  beforeAll(async () => {
    config = await Config.load(join(__dirname, '../../../demo-project'));
    session = await getSession(config);
  });

  test('has variables', () => {
    const counterIndex = session.contracts.findIndex(c => c.contract_id.endsWith('counter'));
    const vars = session.variables[counterIndex];
    expect(vars).toEqual(`{
  counter: 1n
}`);
  });
});
