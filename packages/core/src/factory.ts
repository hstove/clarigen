import type { ClarityValue } from '@stacks/transactions';
import type { TypedAbi, TypedAbiMap } from '../src/abi-types';
import {
  type Batch,
  type DeploymentPlan,
  getContractTxs,
  getDeploymentTxPath,
  getIdentifierForDeploymentTx,
  type DeploymentTransaction,
} from './deployment';
import { type CVInput, parseToCV, transformArgsToCV } from './clarity-types';
import { toCamelCase } from './utils';
import type {
  AllContracts,
  ContractFactory,
  ContractFunctions,
  FunctionsToContractCalls,
  FnToContractCall,
  FullContract,
} from './factory-types';

export const DEPLOYMENT_NETWORKS = [
  'devnet',
  'simnet',
  'testnet',
  'mainnet',
] as const;
export type DeploymentNetwork = (typeof DEPLOYMENT_NETWORKS)[number];

export type DeploymentsForContracts<C extends AllContracts> = {
  [K in keyof C]: ContractDeployments;
};

export type ContractDeployments = {
  [key in DeploymentNetwork]: string | null;
};

export type Project<
  C extends AllContracts,
  D extends DeploymentsForContracts<C>,
> = {
  contracts: C;
  deployments: D;
};

export type FullContractWithIdentifier<
  C extends TypedAbi,
  Id extends string,
> = FullContract<C> & {
  identifier: Id;
};

type IsDeploymentNetwork<T> = T extends DeploymentNetwork
  ? DeploymentNetwork extends T
    ? true
    : false
  : never;

export type ProjectFactory<
  // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
  P extends Project<any, any>,
  N extends DeploymentNetwork,
> = {
  [ContractName in keyof P['contracts']]: FullContractWithIdentifier<
    P['contracts'][ContractName],
    IsDeploymentNetwork<N> extends true
      ? ''
      : NonNullable<P['deployments'][ContractName][N]>
  >;
  // [ContractName in keyof P['contracts']]: P['deployments'][ContractName][N] extends string
  //   ? FullContractWithIdentifier<P['contracts'][ContractName], P['deployments'][ContractName][N]>
  //   : FullContractWithIdentifier<P['contracts'][ContractName], ''> | undefined;
};

export function projectFactory<
  P extends Project<C, D>,
  N extends DeploymentNetwork,
  C extends AllContracts,
  D extends DeploymentsForContracts<C>,
>(project: P, network: N): ProjectFactory<P, N> {
  const e: [keyof C, FullContract<TypedAbi>][] = [];
  // biome-ignore lint/complexity/noForEach: ignored using `--suppress`
  Object.entries(project.contracts).forEach(([contractName, contract]) => {
    const id = project.deployments[contractName]![network];
    if (id) {
      e.push([contractName, contractFactory(contract, id)]);
    }
    return false;
  });
  return Object.fromEntries(e) as ProjectFactory<P, N>;
}

export function contractsFactory<T extends AllContracts>(
  contracts: T,
  deployer: string
): ContractFactory<T> {
  return Object.fromEntries(
    Object.entries(contracts).map(([contractName, contract]) => {
      const identifier = `${deployer}.${contract.contractName}`;
      return [contractName, contractFactory(contract, identifier)];
    })
  ) as ContractFactory<T>;
}

export function functionsFactory<T extends ContractFunctions>(
  functions: T,
  identifier: string
): FunctionsToContractCalls<T> {
  return Object.fromEntries(
    Object.entries(functions).map(([fnName, foundFunction]) => {
      const fn: FnToContractCall<typeof foundFunction> = Object.assign(
        (...args: unknown[] | [Record<string, unknown>]) => {
          const functionArgs = transformArgsToCV(foundFunction, args);
          const [contractAddress, contractName] = identifier.split('.');
          return {
            functionArgs: functionArgs!,
            contractAddress: contractAddress!,
            contractName: contractName!,
            function: foundFunction,
            functionName: foundFunction.name,
            nativeArgs: args,
          };
        },
        { abi: foundFunction }
      );
      return [fnName, fn];
    })
  ) as FunctionsToContractCalls<T>;
}

/**
 * Provide a contract's types and it's contract identifier to generate
 * a full contract object with all functions available.
 *
 * @param abi - The Clarigen-generated contract types
 * @param identifier - The contract's identifier, like `SP000000000000000000002Q6VF78.bns`
 * @returns
 */
export function contractFactory<T extends TypedAbi, Id extends string>(
  abi: T,
  identifier: Id
): FullContractWithIdentifier<T, Id> {
  const full = { ...abi } as FullContract<T>;
  return {
    ...functionsFactory(abi.functions, identifier),
    ...full,
    identifier,
  };
}

export function deploymentFactory<T extends AllContracts>(
  contracts: T,
  deployer: DeploymentPlan
): ContractFactory<T> {
  const result = {} as Partial<ContractFactory<T>>;
  const txs = getContractTxs(
    deployer.plan.batches as Batch<DeploymentTransaction>[]
  );
  // biome-ignore lint/complexity/noForEach: ignored using `--suppress`
  txs.forEach((tx) => {
    const id = getIdentifierForDeploymentTx(tx);
    const [contractAddress, contractFileName] = id.split('.');
    const contractName = toCamelCase(contractFileName!) as keyof T;
    const def = contracts[contractName] as TypedAbi;
    const final = contracts[contractName] as FullContract<T[keyof T]>;
    if (typeof final === 'undefined') {
      throw new Error(
        `Clarigen error: mismatch for contract '${contractName as string}'`
      );
    }
    result[contractName] = final;
    final.contractFile = getDeploymentTxPath(tx);
    final.identifier = id;
    // biome-ignore lint/complexity/noForEach: ignored using `--suppress`
    Object.keys(contracts[contractName]!.functions).forEach((_fnName) => {
      const fnName: keyof (typeof def)['functions'] = _fnName;
      // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
      const fn = ((...args: any[]) => {
        const foundFunction = def.functions[fnName]!;
        const functionArgs = transformArgsToCV(foundFunction, args);
        return {
          functionArgs,
          contractAddress,
          contractName: final.contractName,
          function: foundFunction,
          nativeArgs: args,
        };
      }) as FnToContractCall<(typeof def)['functions']>;
      final[fnName as keyof (typeof result)[typeof contractName]] = fn;
    });
  });
  return result as ContractFactory<T>;
}

export type MapFactory<M extends TypedAbiMap<K, V>, K, V> = {
  key: K;
  _v?: V;
  keyCV: ClarityValue;
  map: M;
};

export function mapFactory<Key, Val>(map: TypedAbiMap<Key, Val>, key: Key) {
  const keyCV = parseToCV(key as CVInput, map.key);
  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  const mapFactory: MapFactory<typeof map, Key, Val> = {
    key,
    keyCV,
    map,
  };
  return mapFactory;
}
