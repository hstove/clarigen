'use server';
import { Configuration, SmartContractsApi } from '@stacks/blockchain-api-client';
import { cache } from 'react';
import pox4Interface from '@/fixtures/pox-4-interface.json';
import pox4Source from '@/fixtures/pox-4-source.json';
import { ClarityAbi } from '@clarigen/core';

const apiUrlEnv = process.env.NEXT_PUBLIC_STACKS_API_URL;

const mainnetApiConfig = new Configuration({
  basePath: apiUrlEnv ?? 'https://api.hiro.so',
});

// export async function fetchContractSrcAbi(contractId: string) {
export const fetchContractSrcAbi = cache(async (contractId: string) => {
  const contractsApi = new SmartContractsApi(mainnetApiConfig);
  const [contractAddress, contractName] = contractId.split('.');

  const fixtures = getFixtures(contractId);
  if (fixtures) return fixtures;
  console.log(`Fetching ${contractId}`);

  const [source, abi] = await Promise.all([
    contractsApi.getContractSource({
      contractAddress,
      contractName,
    }),
    contractsApi.getContractInterface({
      contractAddress,
      contractName,
    }),
  ]);

  return {
    source: source.source,
    abi: abi,
  };
});

function getFixtures(contractId: string) {
  if (
    process.env.NODE_ENV !== 'development' ||
    contractId !== 'SP000000000000000000002Q6VF78.pox-4'
  ) {
    return null;
  }
  return {
    source: pox4Source.source as string,
    abi: pox4Interface as ClarityAbi,
  };
}
