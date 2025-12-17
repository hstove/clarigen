import createClient from 'openapi-fetch';
import type { paths } from '../types/stacks-blockchain-api';
import { NETWORK } from './constants';
import { ClarityAbi } from '@stacks/transactions';
import { format } from 'dnum';

export function getStacksApiUrl(network: NETWORK) {
  return network === 'mainnet'
    ? 'https://api.hiro.so'
    : network === 'devnet'
    ? 'http://localhost:3999'
    : 'https://api.testnet.hiro.so';
}

export function getStacksApi(network: NETWORK) {
  const baseUrl = getStacksApiUrl(network);

  return createClient<paths>({
    baseUrl,
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

export async function getStxBalance(network: NETWORK, address: string) {
  const client = getStacksApi(network);
  const { data, error, response } = await client.GET(
    '/extended/v2/addresses/{principal}/balances/stx',
    {
      params: {
        path: {
          principal: address,
        },
      },
    }
  );
  if (!data) {
    throw new Error(`Failed to get STX balance. Status ${response.status}. ${error?.message}`);
  }
  const { balance } = data;
  return {
    balance,
    balanceFormatted: format([BigInt(balance), 6]),
  };
}
