/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import { initSimnet } from '@stacks/clarinet-sdk';
import {
  type ClarityVersion,
  MAINNET_BURN_ADDRESS,
  type StacksEpochId,
  TESTNET_BURN_ADDRESS,
  getContractName,
  hexToCvValue,
} from '@clarigen/core';
import {
  type Batch,
  type DeploymentTransaction,
  getContractTxs,
  getIdentifierForDeploymentTx,
} from '@clarigen/core/deployment';

import type { Config } from './config';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { parseDeployment } from './files/esm';
import { mapVariables } from './files/variables';
import type { SessionContract, SessionWithVariables } from './session';

export function isBootContractId(contractId: string) {
  return (
    contractId.startsWith(MAINNET_BURN_ADDRESS) ||
    contractId.startsWith(TESTNET_BURN_ADDRESS)
  );
}

// When two contracts share a name, prefer (in order): identifiers from the
// deployment plan (project contracts), non-boot contracts (requirements),
// then boot contracts — mainnet over testnet, since generated identifiers
// have historically used the mainnet burn address. Boot contracts are
// registered at both burn addresses, so without a deterministic rank the
// surviving variant depended on map iteration order.
function identifierRank(contractId: string, preferredIdentifiers: Set<string>) {
  if (preferredIdentifiers.has(contractId)) return 3;
  if (contractId.startsWith(MAINNET_BURN_ADDRESS)) return 1;
  if (contractId.startsWith(TESTNET_BURN_ADDRESS)) return 0;
  return 2;
}

export function deduplicateContractInterfaces<T>(
  interfaces: Iterable<[string, T]>,
  preferredIdentifiers = new Set<string>()
): [string, T][] {
  const contracts = new Map<string, [string, T]>();
  for (const [contractId, contractInterface] of interfaces) {
    const contractName = getContractName(contractId);
    const existing = contracts.get(contractName);
    if (
      !existing ||
      identifierRank(contractId, preferredIdentifiers) >
        identifierRank(existing[0], preferredIdentifiers)
    ) {
      contracts.set(contractName, [contractId, contractInterface]);
    }
  }
  return [...contracts.values()];
}

async function getSimnetDeploymentIdentifiers(config: Config) {
  const path = join(
    dirname(config.clarinetFile()),
    'deployments',
    'default.simnet-plan.yaml'
  );
  const deployment = await parseDeployment(path);
  if (!deployment) return new Set<string>();
  const transactions = getContractTxs(
    deployment.plan.batches as Batch<DeploymentTransaction>[]
  );
  return new Set(
    transactions.flatMap(transaction => {
      try {
        return [getIdentifierForDeploymentTx(transaction)];
      } catch {
        const tx = transaction as unknown as {
          'transaction-type'?: string;
          'contract-name'?: string;
          'emulated-sender'?: string;
        };
        if (
          tx['transaction-type'] === 'emulated-contract-publish' &&
          tx['contract-name'] &&
          tx['emulated-sender']
        ) {
          return [`${tx['emulated-sender']}.${tx['contract-name']}`];
        }
        return [];
      }
    })
  );
}

export async function getSession(
  config: Config
): Promise<SessionWithVariables> {
  const simnet = await initSimnet(config.clarinetFile(), true);
  const interfaces = simnet.getContractsInterfaces();
  const deploymentIdentifiers = await getSimnetDeploymentIdentifiers(config);
  const accounts = simnet.getAccounts();

  const allAccounts = [...accounts.entries()].map(([name, address]) => {
    const result = simnet.runSnippet(`(stx-get-balance '${address})`) as string;
    const resultCV = hexToCvValue<bigint>(result);
    if (typeof resultCV !== 'bigint') {
      throw new Error(
        `Unexpected result type for \`(stx-get-balance \`, got ${resultCV}`
      );
    }
    return {
      name,
      address,
      balance: resultCV.toString(),
    };
  });

  // const docsBaseFolder = (config.outputResolve(OutputType.Docs, './')!)[0];

  // Boot contracts are excluded before deduplication so that a filtered-out
  // variant can never shadow one that should be kept (boot contracts are
  // registered at both burn addresses under the same name).
  const includeBoot = config.esm?.include_boot_contracts === true;
  const filteredInterfaces = [...interfaces.entries()].filter(
    ([contract_id]) => includeBoot || !isBootContractId(contract_id)
  );

  const contracts = await Promise.all(
    deduplicateContractInterfaces(
      filteredInterfaces,
      deploymentIdentifiers
    ).map(async ([contract_id, contract_interface]) => {
      // biome-ignore lint/style/noNonNullAssertion: ignored using `--suppress`
      const name = getContractName(contract_id, false)!;
      const contractPathDef = config.clarinet.contracts?.[name]?.path;
      let source: string | undefined;
      if (contractPathDef) {
        const contractPathFull = config.joinFromClarinet(contractPathDef);
        source = await readFile(contractPathFull, 'utf-8');
      } else {
        // Boot contracts and requirements have no source file in the
        // project; the simnet can provide their source directly, which
        // lets variable/constant extraction work for them.
        source = simnet.getContractSource(contract_id);
      }

      return {
        contract_id,
        contract_interface: {
          ...contract_interface,
          epoch: contract_interface.epoch as StacksEpochId,
          clarity_version: contract_interface.clarity_version as ClarityVersion,
        },
        source: source ?? '',
      } as SessionContract;
    })
  );

  const session = {
    session_id: 0,
    accounts: allAccounts,
    contracts,
  };

  const variables = mapVariables(session, simnet);

  return {
    session_id: 0,
    accounts: allAccounts,
    contracts,
    variables,
    // variables: [],
  };
}
