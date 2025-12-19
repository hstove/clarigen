import { type } from 'arktype';

export const Network = type.or("'devnet'", "'testnet'", "'mainnet'");
export type NETWORK = typeof Network.infer;

/**
 * Detect network from Stacks address prefix.
 * SP... = mainnet, ST... = testnet/devnet
 */
export function detectNetworkFromAddress(
  address: string
): 'mainnet' | 'testnet' | null {
  const prefix = address.substring(0, 2).toUpperCase();
  if (prefix === 'SP') return 'mainnet';
  if (prefix === 'ST') return 'testnet';
  return null;
}

/**
 * Check if an address prefix matches the expected network.
 */
export function isNetworkMismatch(
  network: NETWORK,
  contractId: string
): {
  mismatch: boolean;
  detectedNetwork: 'mainnet' | 'testnet' | null;
  expectedNetwork: NETWORK;
} {
  const address = contractId.split('.')[0];
  const detectedNetwork = detectNetworkFromAddress(address);

  if (!detectedNetwork) {
    return { mismatch: false, detectedNetwork: null, expectedNetwork: network };
  }

  // devnet uses ST... addresses (same as testnet)
  const effectiveNetwork = network === 'devnet' ? 'testnet' : network;
  const mismatch = detectedNetwork !== effectiveNetwork;

  return { mismatch, detectedNetwork, expectedNetwork: network };
}
