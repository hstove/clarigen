import { NativeClarityBinProvider, hasStdErr } from '@clarigen/native-bin';
import { ClarityAbi, toCamelCase } from '@clarigen/core';
import { ConfigContract, ConfigFile } from '../config';
import { dirname, resolve, join } from 'path';
import { makePureTypes } from '..';

export const generateInterfaceFile = ({
  contractName,
  abi,
}: {
  contractName: string;
  abi: ClarityAbi;
}) => {
  const variableName = toCamelCase(contractName, true);
  const { clarity_version, ...rest } = abi;
  const abiString = JSON.stringify(rest, null, 2);

  const fileContents = `import { ClarityAbi } from '@clarigen/core';

// prettier-ignore
export const ${variableName}Interface: ClarityAbi = ${abiString};
`;

  return fileContents;
};

export const generateIndexFile = ({
  contractFile,
  contractAddress,
  contractName,
}: {
  contractFile: string;
  contractAddress: string;
  contractName: string;
}) => {
  const contractTitle = toCamelCase(contractName, true);
  const varName = toCamelCase(contractName);
  const contractType = `${contractTitle}Contract`;
  const interfaceVar = `${contractTitle}Interface`;

  const fileContents = `import { pureProxy, Contract } from '@clarigen/core';
import type { ${contractType} } from './types';
import { ${interfaceVar} } from './abi';
export type { ${contractType} } from './types';

export function ${varName}Contract(contractAddress: string, contractName: string) {
  return pureProxy<${contractType}>({
    abi: ${interfaceVar},
    contractAddress,
    contractName,
  });
}

export const ${varName}Info: Contract<${contractType}> = {
  contract: ${varName}Contract,
  address: '${contractAddress}',
  contractFile: '${contractFile}',
  name: '${contractName}',
  abi: ${interfaceVar},
};
`;

  return fileContents;
};

export const generateTypesFile = (abi: ClarityAbi, contractName: string) => {
  const name = toCamelCase(contractName, true);
  const typings = makePureTypes(abi);
  const fileContents = `import { Response, ContractCalls } from '@clarigen/core';

// prettier-ignore
export interface ${name}Contract {
${typings}
}
`;

  return fileContents;
};

export const generateProjectIndexFile = (config: ConfigFile) => {
  const imports: string[] = [
    "import type { ContractInstances } from '@clarigen/core';",
  ];
  const exports: string[] = [];
  const contractMap: string[] = [];

  let accounts = '';
  if ('accounts' in config) {
    const accountLines = Object.keys(config.accounts).map((key) => {
      const account = config.accounts[key];
      return `"${key}": {
    mnemonic: "${account.mnemonic}",
    balance: ${account.balance.toString()}n,
    address: "${account.address}",
  },`;
    });

    accounts = `\n\n// prettier-ignore
export const accounts = {
  ${accountLines.join('\n  ')}
};`;
  }

  config.contracts.forEach((contract) => {
    const contractName = contract.name;
    const contractVar = toCamelCase(contractName);
    const contractInfo = `${contractVar}Info`;
    const contractInterface = `${toCamelCase(contractName, true)}Contract`;
    const dirName = dirname(contract.file);
    const importPath = `'./${contractName}'`;

    const _import = `import { ${contractInfo} } from ${importPath};`;
    imports.push(_import);

    const _export = `export type { ${contractInterface} } from ${importPath};`;
    exports.push(_export);

    const map = `${contractVar}: ${contractInfo},`;
    contractMap.push(map);
  });

  const contractsType = `\nexport type Contracts = ContractInstances<typeof contracts>;\n`;

  const file = `${imports.join('\n')}
${exports.join('\n')}
${contractsType}
export const contracts = {
  ${contractMap.join('\n  ')}
};${accounts}
`;
  return file;
};
