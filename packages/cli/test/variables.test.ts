import { join } from 'node:path';
import { Config } from '../src/config';
import { getSession } from '../src/clarinet-sdk';
import type { SessionWithVariables } from '../src/session';
import { test, expect, describe, beforeAll } from 'vitest';

describe('variables', () => {
  let config: Config;
  let session: SessionWithVariables;
  beforeAll(async () => {
    config = await Config.load(join(__dirname, '../../../demo-project'));
    session = await getSession(config);
  });

  test('has variables', () => {
    if (process.env.CI) {
      return;
    }
    const counterIndex = session.contracts.findIndex((c) =>
      c.contract_id.endsWith('counter')
    );
    const vars = session.variables[counterIndex];
    expect(vars).toEqual(`{
  counter: 1n
}`);
  });
});
