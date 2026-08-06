import { join } from 'node:path';
import { Config } from '../src/config';
import {
  deduplicateContractInterfaces,
  getSession,
  isBootContractId,
} from '../src/clarinet-sdk';
import { collectContractDeployments, getDeployments } from '../src/files/esm';
import type { SessionWithVariables } from '../src/session';
import { test, expect, describe, beforeAll } from 'vitest';

const MAINNET_POX4 = 'SP000000000000000000002Q6VF78.pox-4';
const TESTNET_POX4 = 'ST000000000000000000002AMW42H.pox-4';
const PROJECT_POX4 = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pox-4';

describe('deduplicateContractInterfaces', () => {
  test('prefers deployment-plan identifiers over boot contracts', () => {
    const result = deduplicateContractInterfaces(
      [
        [TESTNET_POX4, 1],
        [PROJECT_POX4, 2],
        [MAINNET_POX4, 3],
      ],
      new Set([PROJECT_POX4])
    );
    expect(result).toEqual([[PROJECT_POX4, 2]]);
  });

  test('prefers the mainnet burn address variant regardless of order', () => {
    const orders = [
      [TESTNET_POX4, MAINNET_POX4],
      [MAINNET_POX4, TESTNET_POX4],
    ];
    for (const order of orders) {
      const result = deduplicateContractInterfaces(
        order.map((id, i) => [id, i] as [string, number])
      );
      expect(result).toHaveLength(1);
      expect(result[0][0]).toEqual(MAINNET_POX4);
    }
  });

  test('prefers non-boot contracts over boot variants', () => {
    const result = deduplicateContractInterfaces([
      [MAINNET_POX4, 1],
      [PROJECT_POX4, 2],
    ]);
    expect(result).toEqual([[PROJECT_POX4, 2]]);
  });
});

describe.skipIf(process.env.CI)('sessions with boot contracts', () => {
  let config: Config;
  let session: SessionWithVariables;
  beforeAll(async () => {
    config = await Config.load(join(__dirname, '../../../demo-project'));
    config.configFile.types = {
      ...(config.configFile.types ?? {}),
      include_boot_contracts: true,
    };
    session = await getSession(config);
  });

  test('boot contracts are included once, at the mainnet burn address', () => {
    const pox4Contracts = session.contracts.filter((c) =>
      c.contract_id.endsWith('.pox-4')
    );
    expect(pox4Contracts).toHaveLength(1);
    expect(pox4Contracts[0].contract_id).toEqual(MAINNET_POX4);
  });

  test('boot contracts have source and extracted variables', () => {
    const index = session.contracts.findIndex(
      (c) => c.contract_id === MAINNET_POX4
    );
    const pox4 = session.contracts[index];
    expect(pox4.source.length).toBeGreaterThan(0);
    const vars = session.variables[index];
    expect(vars.length).toBeGreaterThan('{}'.length);
  });

  test('requirement contracts have source from the simnet', () => {
    const sbtcToken = session.contracts.find((c) =>
      c.contract_id.endsWith('.sbtc-token')
    );
    expect(sbtcToken).toBeDefined();
    expect(sbtcToken?.source.length).toBeGreaterThan(0);
  });

  test('boot contracts get per-network deployment identifiers', async () => {
    const deployments = await getDeployments(config);
    const full = collectContractDeployments(session, deployments, config);
    expect(full.pox4).toEqual({
      mainnet: MAINNET_POX4,
      testnet: TESTNET_POX4,
      simnet: TESTNET_POX4,
      devnet: TESTNET_POX4,
    });
  });
});

describe.skipIf(process.env.CI)('sessions without boot contracts', () => {
  test('boot contracts are excluded by default', async () => {
    const config = await Config.load(join(__dirname, '../../../demo-project'));
    config.configFile.types = {
      ...(config.configFile.types ?? {}),
      include_boot_contracts: false,
    };
    const session = await getSession(config);
    expect(session.contracts.length).toBeGreaterThan(0);
    expect(
      session.contracts.every((c) => !isBootContractId(c.contract_id))
    ).toBe(true);
  });
});
