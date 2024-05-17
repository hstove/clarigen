import { contractPrincipalCV, ContractPrincipalCV } from '@stacks/transactions';
import { Contract } from './types';
import { hex } from '@scure/base';
import { TypedAbi } from './abi-types';
import { AllContracts } from './factory-types';

export const TESTNET_BURN_ADDRESS = 'ST000000000000000000002AMW42H';
export const MAINNET_BURN_ADDRESS = 'SP000000000000000000002Q6VF78';

export const toCamelCase = (input: string | number | symbol, titleCase?: boolean) => {
  const inputStr = typeof input === 'string' ? input : String(input);
  // Check if the input string only contains uppercase letters and/or underscores
  const isUpperCaseAndUnderscore = /^[A-Z_]+$/.test(inputStr);
  if (isUpperCaseAndUnderscore) {
    return inputStr;
  }
  const [first, ...parts] = inputStr.replace('!', '_x').replace('?', '_q').split('-');
  const firstChar = titleCase ? first[0].toUpperCase() : first[0].toLowerCase();
  let result = `${firstChar}${first.slice(1)}`;
  parts.forEach(part => {
    const capitalized = part[0].toUpperCase() + part.slice(1);
    result += capitalized;
  });
  return result;
};

export function toKebabCase(input: string): string {
  const matches = input.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
  if (!matches) return input;
  return matches.join('-').toLowerCase();
}

export function getContractName(identifier: string, camelCase = true) {
  const name = identifier.split('.')[1];
  return camelCase ? toCamelCase(name) : name;
}

export const getContractNameFromPath = (path: string) => {
  const contractPaths = path.split('/');
  const filename = contractPaths[contractPaths.length - 1];
  const [contractName] = filename.split('.');
  return contractName;
};

export const getContractIdentifier = <T>(contract: Contract<T>) => {
  return `${contract.address}.${contract.name}`;
};

export const getContractPrincipalCV = <T>(contract: Contract<T>): ContractPrincipalCV => {
  const contractName = getContractNameFromPath(contract.contractFile);
  return contractPrincipalCV(contract.address, contractName);
};

export function bootContractIdentifier(name: string, mainnet: boolean) {
  const addr = mainnet ? MAINNET_BURN_ADDRESS : TESTNET_BURN_ADDRESS;
  return `${addr}.${name}`;
}

export function bytesToHex(bytes: Uint8Array) {
  return hex.encode(bytes);
}

export function hexToBytes(hexString: string) {
  return hex.decode(hexString);
}

export function bytesToAscii(bytes: Uint8Array) {
  const bytesArray = Array.from(bytes);
  return String.fromCharCode.apply(null, bytesArray);
}

export const isNumber = (value: number | string): value is number => typeof value === 'number';

// Error code helpers

type ErrorKeyCheck<K> = K extends string
  ? Lowercase<K> extends `err${string}`
    ? K
    : never
  : never;

export type ErrorCodes<C extends TypedAbi['constants']> = {
  [K in keyof C as ErrorKeyCheck<K>]: C[K] extends {
    isOk: boolean;
    value: infer V;
  }
    ? V
    : C[K];
};

export type ProjectErrors<
  T extends {
    contracts: AllContracts;
  }
> = {
  [K in keyof T['contracts']]: ErrorCodes<T['contracts'][K]['constants']>;
};

export function extractErrors<T extends TypedAbi>(contract: T): ErrorCodes<T['constants']> {
  const { constants } = contract;

  const result: Partial<ErrorCodes<T['constants']>> = {};

  for (const key in constants) {
    if (key.toLowerCase().startsWith('err')) {
      const value = constants[key];
      if (
        typeof value === 'object' &&
        value &&
        'isOk' in value &&
        !value.isOk &&
        'value' in value
      ) {
        result[key as keyof ErrorCodes<T['constants']>] = value.value as ErrorCodes<
          T['constants']
        >[keyof ErrorCodes<T['constants']>];
      } else {
        result[key as keyof ErrorCodes<T['constants']>] = value as ErrorCodes<
          T['constants']
        >[keyof ErrorCodes<T['constants']>];
      }
    }
  }

  return result as unknown as ErrorCodes<T['constants']>;
}

export function projectErrors<
  T extends {
    contracts: AllContracts;
  }
>(project: T): ProjectErrors<T> {
  const { contracts } = project;
  const result: Partial<ProjectErrors<T>> = {};

  for (const key in contracts) {
    result[key as keyof ProjectErrors<T>] = extractErrors(contracts[key]);
  }

  return result as unknown as ProjectErrors<T>;
}
