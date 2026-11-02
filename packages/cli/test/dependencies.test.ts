/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import { deduplicateContractInterfaces, getSession } from '../src/clarinet-sdk';
import { test, expect } from 'vitest';
import { Config } from '../src/config';
import { fileURLToPath } from 'node:url';

const dependenciesFixture = fileURLToPath(new URL('./dependencies', import.meta.url));
// Requirements are fetched from the Stacks API on a cold cache
const REQUIREMENTS_TIMEOUT = 60_000;

test('contract interfaces with the same name keep the canonical requirement', () => {
  const requirement = { name: 'requirement' };
  const simnetDependency = { name: 'simnet' };
  const requirementId = 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token';
  const interfaces = deduplicateContractInterfaces(
    [
      ['ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token', simnetDependency],
      [requirementId, requirement],
    ],
    new Set([requirementId])
  );

  expect(interfaces).toEqual([[requirementId, requirement]]);
});

test(
  'getting a session with a project that has testnet requirements',
  async () => {
    const config = await Config.load(dependenciesFixture);
    const session = await getSession(config);
    const testContract = session.contracts.find(
      c => c.contract_id === 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.send_many'
    );
    expect(testContract).toBeDefined();
  },
  REQUIREMENTS_TIMEOUT
);

test(
  'boot contract overrides do not produce duplicate contract names',
  async () => {
    const config = await Config.load(dependenciesFixture);
    const session = await getSession(config);
    const names = session.contracts.map(contract => contract.contract_id.split('.')[1]);

    expect(new Set(names).size).toBe(names.length);
  },
  REQUIREMENTS_TIMEOUT
);
