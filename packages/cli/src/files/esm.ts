import { readFile } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import type { Config } from '../config';
import { parse } from 'yaml';
import {
  type Batch,
  getContractTxs,
  getDeploymentContract,
  getDeploymentTxPath,
  getIdentifierForDeploymentTx,
  type DeploymentTransaction,
} from '@clarigen/core/deployment';
import type { DeploymentPlan, SimnetDeploymentPlan } from '@clarigen/core';
import { getContractName } from '@clarigen/core';
import { sortContracts } from '../utils';
import type { Session } from '../session';
import { spawn } from 'node:child_process';
import { logger } from '../logger';

export async function parseDeployment(path: string) {
  const contents = await readFile(path, 'utf-8');
  const parsed = parse(contents);
  return parsed as Plan;
}

export const DEPLOYMENT_NETWORKS = [
  'devnet',
  'simnet',
  'testnet',
  'mainnet',
] as const;
export type DeploymentNetwork = (typeof DEPLOYMENT_NETWORKS)[number];

type Plan = DeploymentPlan | undefined;
type DeploymentsMap = {
  [key in DeploymentNetwork]: Plan;
};

export async function getDeployments(config: Config): Promise<DeploymentsMap> {
  const entries = await Promise.all(
    DEPLOYMENT_NETWORKS.map(async (network) => {
      const file = `default.${network}-plan.yaml`;
      const path = join(dirname(config.clarinetFile()), 'deployments', file);
      let plan: Plan;
      try {
        plan = await parseDeployment(path);
      } catch (_) {}
      return [network, plan] as [DeploymentNetwork, Plan];
    })
  );
  return Object.fromEntries(entries) as DeploymentsMap;
}

export async function generateESMFile({
  baseFile,
  session,
  config,
}: {
  baseFile: string;
  session: Session;
  config: Config;
}) {
  const deployments = await getDeployments(config);
  const contractDeployments = collectContractDeployments(
    session,
    deployments,
    config
  );

  const simnet = generateSimnetCode(config, deployments, session);

  return `${baseFile}
export const deployments = ${JSON.stringify(contractDeployments)} as const;
${simnet}
export const project = {
  contracts,
  deployments,
} as const;
  `;
}

export type ContractDeployments = {
  [key in DeploymentNetwork]: string | null;
};

export type FullContractDeployments = {
  [contractName: string]: ContractDeployments;
};

function insertNetworkId(
  deployments: FullContractDeployments,
  identifier: string,
  network: DeploymentNetwork
) {
  const name = getContractName(identifier);
  if (!deployments[name]) {
    // log.debug(`Not setting deployment ID for ${name} on ${network}`);
    return;
  }
  if (deployments[name][network] === null) {
    deployments[name][network] = identifier;
  }
}

export function collectContractDeployments(
  session: Session,
  deployments: DeploymentsMap,
  config: Config
): FullContractDeployments {
  const full = Object.fromEntries(
    sortContracts(session.contracts).map((contract) => {
      const contractName = getContractName(contract.contract_id);
      const contractDeployments = Object.fromEntries(
        DEPLOYMENT_NETWORKS.map((network) => {
          const deployment = deployments[network];
          if (typeof deployment === 'undefined') {
            return [network, null];
          }
          try {
            const contractName = contract.contract_id.split('.')[1];
            const tx = getDeploymentContract(contractName, deployment);
            const id = getIdentifierForDeploymentTx(tx);
            return [network, id];
          } catch (_) {
            return [network, null];
          }
        })
      ) as ContractDeployments;
      return [contractName, contractDeployments];
    })
  ) as FullContractDeployments;

  const deployer = session.accounts.find((a) => a.name === 'deployer');

  // handle defaults when there is no deployment file
  config.clarinet.project.requirements?.forEach(({ contract_id }) => {
    insertNetworkId(full, contract_id, 'mainnet');
    const contractName = contract_id.split('.')[1];
    if (deployer) {
      const devnetId = `${deployer.address}.${contractName}`;
      insertNetworkId(full, devnetId, 'devnet');
    }
  });

  session.contracts.forEach((contract) => {
    insertNetworkId(full, contract.contract_id, 'devnet');
    insertNetworkId(full, contract.contract_id, 'simnet');
  });

  return full;
}

export function collectDeploymentFiles(
  deployments: DeploymentsMap,
  clarinetFolder: string,
  cwd: string
) {
  if (!deployments.simnet) return [];
  const simnet = deployments.simnet as SimnetDeploymentPlan;
  const txs = getContractTxs(
    simnet.plan.batches as Batch<DeploymentTransaction>[]
  );
  const entries = txs.map((tx) => {
    const id = getIdentifierForDeploymentTx(tx);
    const contractFile = getDeploymentTxPath(tx);
    return {
      identifier: id,
      file: relative(cwd, join(clarinetFolder, contractFile)),
    };
  });
  return entries;
}

function generateSimnetCode(
  config: Config,
  deployments: DeploymentsMap,
  _session: Session
) {
  if (!config.esm?.include_accounts) return '';

  const clarinetFolder = dirname(config.clarinetFile());

  const files = collectDeploymentFiles(deployments, clarinetFolder, config.cwd);
  // const accounts = generateAccountsCode(session);

  return `
export const simnetDeployment = ${JSON.stringify(files)};
`;
  // ${accounts}

  // export const simnet = {
  //   deployment: simnetDeployment,
  //   accounts,
  // };
}

export async function afterESM(config: Config): Promise<void> {
  const command = config.esm?.after;
  if (!command) return;
  logger.debug(`Running after ESM command: ${command}`);
  const parts = command.split(' ');
  const [cmd, ...args] = parts;
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: config.cwd,
      stdio: 'inherit',
    });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code ?? 'unknown'}`));
      }
    });
  });
}
