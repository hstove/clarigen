'use server';
import { fetchContractSrcAbi } from '@/lib/stacks-api';
import {
  SessionContract,
  TYPE_IMPORTS,
  createContractDocInfo,
  generateContractMeta,
  generateMarkdown,
} from '@clarigen/cli';
import { ClarityAbi, toCamelCase } from '@clarigen/core';
import escape from 'escape-html';
import { compileMdx } from './mdx-utils';
import { format } from 'prettier';
import { cache } from 'react';

export async function fetchContractMeta(contractId: string): Promise<SessionContract> {
  const contractInfo = await fetchContractSrcAbi(contractId);
  const contract = {
    contract_id: contractId,
    contract_interface: {
      ...contractInfo.abi,
      clarity_version: 'Clarity1',
      epoch: 'Epoch10',
    } as ClarityAbi,
    source: escape(contractInfo.source),
  };

  return contract;
}

export async function generateContractMarkdown(contract: SessionContract) {
  const mdString = generateMarkdown({ contract, withToc: false });
  const mdCode = await compileMdx(mdString);
  const docContract = createContractDocInfo({
    contractSrc: contract.source,
    abi: contract.contract_interface,
  });
  return {
    markdown: await format(mdString, { parser: 'markdown' }),
    mdx: mdCode.code,
    docContract,
  };
}

function contractIdToVarName(contractId: string) {
  return `${toCamelCase(contractId.split('.')[1])}Contract`;
}

export async function generateContractTypes(contract: SessionContract) {
  const varName = contractIdToVarName(contract.contract_id);
  const contractType = generateContractMeta(contract, '{}');
  const typeCode = `${TYPE_IMPORTS}

export const ${varName} = ${contractType};
`;
  return format(typeCode, { parser: 'typescript' });
}

export async function generateTypeUsageCode(contractId: string) {
  const tsFile = contractId.split('.')[1];
  const varName = contractIdToVarName(contractId);

  const typeCode = `import { contractFactory } from '@clarigen/core';
// Import the types from the generated file
import { ${varName} } from './${tsFile}.ts';

export const ${toCamelCase(tsFile)} = contractFactory(${varName}, '${contractId}');
`;
  return typeCode;
}

export async function generateTypeUsagePage(contract: SessionContract) {
  const typeUsage = await generateTypeUsageCode(contract.contract_id);
  return typeUsage;
}

export type GeneratedContractFiles = Awaited<ReturnType<typeof generateContractFiles>>;

// export async function generateContractFiles(contractId: string) {
export const generateContractFiles = cache(async (contractId: string) => {
  const contract = await fetchContractMeta(contractId);
  const markdownWithToc = await format(generateMarkdown({ contract }), { parser: 'markdown' });
  const [docs, types, usage] = await Promise.all([
    generateContractMarkdown(contract),
    generateContractTypes(contract),
    generateTypeUsageCode(contract.contract_id),
  ]);
  return {
    contractId,
    types,
    clarity: contract.source,
    markdownWithToc,
    usage,
    ...docs,
  };
});
