import type { Contracts, ContractInstances } from './types';

type MakeContractsOptions = {
  deployerAddress?: string;
};

// biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
export function makeContracts<T extends Contracts<any>>(
  contracts: T,
  options: MakeContractsOptions = {}
): ContractInstances<T> {
  const instances = {} as ContractInstances<T>;
  // biome-ignore lint/suspicious/useGuardForIn: ignored using `--suppress`
  for (const k in contracts) {
    const contract = contracts[k];
    const address = options.deployerAddress || contract.address;
    const identifier = `${address}.${contract.name}`;
    const instance = contract.contract(address, contract.name) as ReturnType<
      T[typeof k]['contract']
    >;
    instances[k] = {
      identifier,
      contract: instance,
    };
  }
  return instances;
}
