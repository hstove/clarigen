import createClient from 'openapi-fetch';
import type { paths } from '../types/stacks-blockchain-api';
import { NETWORK } from './constants';
import { ClarityAbi } from '@stacks/transactions';

export function getStacksApi(network: NETWORK) {
  return createClient<paths>({
    baseUrl: network === 'mainnet' ? 'https://api.hiro.so' : 'https://api.testnet.hiro.so',
  });
}

export async function getContractInfo(network: NETWORK, contractId: string) {
  const client = getStacksApi(network);
  const { data, error, response } = await client.GET('/extended/v1/contract/{contract_id}', {
    params: {
      path: {
        contract_id: contractId,
      },
    },
  });
  if (!data) {
    throw new Error(`Failed to get contract info. Status ${response.status}. ${error?.message}`);
  }

  return data;
}

export async function getContractAbi(network: NETWORK, contractId: string) {
  const contractInfo = await getContractInfo(network, contractId);
  const abiStr = contractInfo.abi;
  if (!abiStr) {
    throw new Error('Expected ABI');
  }
  const abi = JSON.parse(abiStr) as ClarityAbi;
  return abi;
}
