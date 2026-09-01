import type { NETWORK } from './constants';
import { getTransaction } from './stacks-api';
import type { StacksTransaction } from '@/types/stacks-transaction';

type ContractCallTx = Extract<
  typeof StacksTransaction.infer,
  { tx_type: 'contract_call' }
>;

export type ContractCallLookup = {
  network: NETWORK;
  contractId: string;
  functionName: string;
  txid: string;
  tx: ContractCallTx;
};

function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && /Status 404/.test(error.message);
}

function lookupOrder(preferred: NETWORK): NETWORK[] {
  if (preferred === 'devnet') return ['devnet'];
  if (preferred === 'testnet') return ['testnet', 'mainnet'];
  return ['mainnet', 'testnet'];
}

function asContractCall(
  tx: typeof StacksTransaction.infer,
  network: NETWORK,
  txid: string
): ContractCallLookup {
  if (tx.tx_type !== 'contract_call') {
    throw new Error(`transaction is a ${tx.tx_type}, not a contract call`);
  }
  return {
    network,
    contractId: tx.contract_call.contract_id,
    functionName: tx.contract_call.function_name,
    txid,
    tx,
  };
}

/**
 * Look up a contract-call transaction, trying the preferred network first
 * and falling back to the other public network on 404.
 */
export async function lookupContractCall(
  txid: string,
  preferred: NETWORK
): Promise<ContractCallLookup> {
  const networks = lookupOrder(preferred);
  let lastError: Error | null = null;

  for (const network of networks) {
    try {
      const tx = await getTransaction(network, txid);
      return asContractCall(tx, network, txid);
    } catch (error) {
      if (!isNotFoundError(error) || network === networks.at(-1)) {
        throw error instanceof Error ? error : new Error(String(error));
      }
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  throw lastError ?? new Error('transaction not found');
}
