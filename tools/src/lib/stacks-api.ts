import createClient from 'openapi-fetch';
import type { paths } from '../types/stacks-blockchain-api';
import { StacksTransaction } from '../types/stacks-transaction';
import { NETWORK } from './constants';
import { ClarityAbi } from '@clarigen/core';
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
  return parseContractAbi(contractInfo.abi);
}

export function parseContractAbi(abiStr: string | null): ClarityAbi {
  if (!abiStr) {
    throw new Error('Expected ABI');
  }
  return JSON.parse(abiStr) as ClarityAbi;
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

export async function getTransaction(
  network: NETWORK,
  txId: string
): Promise<typeof StacksTransaction.infer> {
  const client = getStacksApi(network);
  const { data, error, response } = await client.GET('/extended/v1/tx/{tx_id}', {
    params: {
      path: {
        tx_id: txId,
      },
    },
  });
  if (!data) {
    throw new Error(`Failed to get transaction. Status ${response.status}. ${error?.message}`);
  }
  return StacksTransaction.assert(data);
}
