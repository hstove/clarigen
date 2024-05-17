import { abiFunctionType, jsTypeFromAbiType } from '../declaration';
import type { SessionContract, SessionWithVariables } from '../session';
import { encodeVariableName, sortContracts } from '../utils';
import { toCamelCase, ClarityAbiVariable } from '@clarigen/core';
import { generateAccountsCode } from './accounts';
import { generateIdentifiersCode } from './identifiers';
import { inspect, InspectOptions } from 'util';

export function generateContractMeta(contract: SessionContract, constants: string) {
  const abi = contract.contract_interface;
  const functionLines: string[] = [];
  const { functions, maps, variables, non_fungible_tokens, ...rest } = abi;

  functions.forEach(func => {
    let functionLine = `${toCamelCase(func.name)}: `;
    const funcDef = JSON.stringify(func);
    functionLine += funcDef;
    const functionType = abiFunctionType(func);
    functionLine += ` as ${functionType}`;
    functionLines.push(functionLine);
  });

  const mapLines = maps.map(map => {
    let mapLine = `${toCamelCase(map.name)}: `;
    const keyType = jsTypeFromAbiType(map.key, true);
    const valType = jsTypeFromAbiType(map.value);
    mapLine += JSON.stringify(map);
    mapLine += ` as TypedAbiMap<${keyType}, ${valType}>`;
    return mapLine;
  });

  const otherAbi = JSON.stringify(rest);
  const contractName = contract.contract_id.split('.')[1];

  const variableLines = encodeVariables(variables);

  const nftLines = non_fungible_tokens.map(nft => {
    return JSON.stringify(nft);
  });

  return `{
  ${serializeLines('functions', functionLines)}
  ${serializeLines('maps', mapLines)}
  ${serializeLines('variables', variableLines)}
  constants: ${constants},
  ${serializeArray('non_fungible_tokens', nftLines)}
  ${otherAbi.slice(1, -1)},
  contractName: '${contractName}',
  }`;
}

export const TYPE_IMPORTS = `import type { TypedAbiArg, TypedAbiFunction, TypedAbiMap, TypedAbiVariable, Response } from '@clarigen/core';`;

export function generateBaseFile(session: SessionWithVariables) {
  const combined = session.contracts.map((c, i) => ({
    ...c,
    constants: session.variables[i],
  }));
  const contractDefs = sortContracts(combined).map(contract => {
    const meta = generateContractMeta(contract, contract.constants);
    const id = contract.contract_id.split('.')[1];
    const keyName = toCamelCase(id);
    return `${keyName}: ${meta}`;
  });

  const file = `
${TYPE_IMPORTS}

export const contracts = {
  ${contractDefs.join(',\n')}
} as const;

export const accounts = ${generateAccountsCode(session.accounts)} as const;

${generateIdentifiersCode(session)}

export const simnet = {
  accounts,
  contracts,
  identifiers,
} as const;

`;
  return file;
}

export function encodeVariables(variables: ClarityAbiVariable[]) {
  return variables.map(v => {
    let varLine = `${encodeVariableName(v.name)}: `;
    const type = jsTypeFromAbiType(v.type);
    const varJSON = serialize(v);
    varLine += `${varJSON} as TypedAbiVariable<${type}>`;
    return varLine;
  });
}

// Extend the Uint8Array prototype in TypeScript to include util.inspect.custom
declare global {
  interface Uint8Array {
    [inspect.custom](depth: number, options: InspectOptions): string;
  }
}

Uint8Array.prototype[inspect.custom] = function (depth: number, options: InspectOptions) {
  return `Uint8Array.from([${this.join(',')}])`;
};

export function serialize(obj: any) {
  return inspect(obj, {
    // showHidden: false,
    // depth: 100,
    // colors: false,
    showHidden: false,
    // iterableLimit: 100000,
    compact: false,
    // trailingComma: true,
    depth: 100,
    colors: false,
    maxArrayLength: Infinity,
    maxStringLength: Infinity,
    breakLength: Infinity,
    numericSeparator: true,
    // strAbbreviateSize: 100000,
  });
}

function serializeLines(key: string, lines: string[]) {
  return `"${key}": {
    ${lines.join(',\n    ')}
  },`;
}

function serializeArray(key: string, lines: string[]) {
  return `"${key}": [
    ${lines.join(',\n    ')}
  ],`;
}
