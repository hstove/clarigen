import { type } from 'arktype';

export const Network = type.or("'devnet'", "'testnet'", "'mainnet'");
export type NETWORK = typeof Network.infer;
