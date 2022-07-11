import { ClarityAbiFunction, ClarityValue } from 'micro-stacks/clarity';
import { TypedAbi, TypedAbiFunction } from '../src/abi-types';
import {
  Batch,
  DeploymentPlan,
  flatBatch,
  getContractTxs,
  getDeploymentContract,
  getDeploymentTxPath,
  getIdentifier,
  Transaction,
} from './deployment';
import { transformArguments } from './pure';
import { toCamelCase } from './utils';

export interface ContractCall<T> {
  function: ClarityAbiFunction;
  nativeArgs: any[];
  functionArgs: ClarityValue[];
  contractAddress: string;
  contractName: string;
  _r?: T;
}

export interface ContractCallTyped<Args, R> extends Omit<ContractCall<R>, 'nativeArgs'> {
  nativeArgs: Args;
}

export type ContractFunctions = {
  [key: string]: TypedAbiFunction<unknown[], unknown>;
};

export type AllContracts = Record<string, TypedAbi>;

export type ContractCallFunction<Args extends any[], R> = (
  ...args: Args
) => ContractCallTyped<Args, R>;

export type FnToContractCall<T> = T extends TypedAbiFunction<infer Arg, infer R>
  ? ContractCallFunction<Arg, R>
  : never;

export type FunctionsToContractCalls<T> = T extends ContractFunctions
  ? {
      [key in keyof T]: FnToContractCall<T[key]>;
    }
  : never;

export type FullContract<T> = T extends TypedAbi
  ? FunctionsToContractCalls<T['functions']> & T & { identifier: string } & { contractFile: string }
  : never;

export type ContractFactory<T extends AllContracts> = {
  [key in keyof T]: FullContract<T[key]>;
};

type UnknownContractCallFunction = ContractCallFunction<unknown[], unknown>;

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
      const fn: FnToContractCall<typeof foundFunction> = (...args: unknown[]) => {
        const functionArgs = transformArguments(foundFunction, args);
        const [contractAddress, contractName] = identifier.split('.');
        return {
          functionArgs: functionArgs,
          contractAddress,
          contractName,
          function: foundFunction,
          nativeArgs: args,
        };
      };
      return [fnName, fn];
    })
  ) as FunctionsToContractCalls<T>;
}

export function contractFactory<T extends TypedAbi>(abi: T, identifier: string) {
  const full = { ...abi } as FullContract<T>;
  full.identifier = identifier;
  return {
    ...functionsFactory(abi.functions, identifier),
    ...full,
  };
}

export function deploymentFactory<T extends AllContracts>(
  contracts: T,
  deployer: DeploymentPlan
): ContractFactory<T> {
  const result = {} as Partial<ContractFactory<T>>;
  const txs = getContractTxs(deployer.plan.batches as Batch<Transaction>[]);
  txs.forEach(tx => {
    const id = getIdentifier(tx);
    const [contractAddress, contractFileName] = id.split('.');
    const contractName = toCamelCase(contractFileName) as keyof T;
    const def = contracts[contractName] as TypedAbi;
    const final = contracts[contractName] as FullContract<T[keyof T]>;
    if (typeof final === 'undefined') {
      throw new Error(`Clarigen error: mismatch for contract '${contractName as string}'`);
    }
    result[contractName] = final;
    final.contractFile = getDeploymentTxPath(tx);
    final.identifier = id;
    Object.keys(contracts[contractName].functions).forEach(_fnName => {
      const fnName: keyof typeof def['functions'] = _fnName;
      const fn = ((...args: any[]) => {
        const foundFunction = def.functions[fnName];
        const functionArgs = transformArguments(foundFunction, args);
        return {
          functionArgs: functionArgs,
          contractAddress: contractAddress,
          contractName: final.contractName,
          function: foundFunction,
          nativeArgs: args,
        };
      }) as FnToContractCall<typeof def['functions']>;
      final[fnName as keyof typeof result[typeof contractName]] = fn;
    });
  });
  return result as ContractFactory<T>;
}
