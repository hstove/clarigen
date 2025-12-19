import type {
  NonFungiblePostCondition,
  FungiblePostCondition,
} from '@stacks/transactions';
import type { ClarityAbiType, TypedAbi } from './abi-types';
import {
  type AbiTypeTo,
  type CVInput,
  parseToCV,
  type ReadonlyTuple,
} from './clarity-types';
import type { FullContract } from './factory-types';

type AbiWithAssets = Pick<
  FullContract<TypedAbi>,
  'non_fungible_tokens' | 'fungible_tokens' | 'identifier'
>;

export type AssetNames<T extends AbiWithAssets> =
  | T['non_fungible_tokens'][number]['name']
  | T['fungible_tokens'][number]['name'];

export function createAssetInfo<T extends AbiWithAssets>(
  contract: T,
  asset: AssetNames<T>
): `${string}.${string}::${string}` {
  const [addr, name] = contract.identifier.split('.');
  if (!('identifier' in contract)) {
    throw new Error('Invalid contract');
  }
  for (const nft of contract.non_fungible_tokens) {
    if (nft.name === asset) {
      return `${addr}.${name}::${nft.name}`;
    }
  }
  for (const ft of contract.fungible_tokens) {
    if (ft.name === asset) {
      return `${addr}.${name}::${ft.name}`;
    }
  }
  throw new Error(`Invalid asset: "${asset}" is not an asset in contract.`);
}

export type NftAssetType<T extends AbiWithAssets> =
  T['non_fungible_tokens'][0] extends {
    type: infer Type;
  }
    ? Type extends ClarityAbiType | ReadonlyTuple
      ? AbiTypeTo<Type>
      : never
    : never;

export function makeNonFungiblePostCondition<T extends AbiWithAssets>(
  contract: T,
  sender: string,
  condition: 'sent' | 'not-sent',
  value: NftAssetType<T>
): NonFungiblePostCondition {
  const [nftType] = contract.non_fungible_tokens;
  const asset = createAssetInfo(contract, nftType!.name);
  const abiType = nftType!.type;
  const cv = parseToCV(value as CVInput, abiType);
  return {
    type: 'nft-postcondition',
    address: sender,
    condition,
    asset,
    assetId: cv,
  };
}

export function makeFungiblePostCondition<T extends AbiWithAssets>(
  contract: T,
  sender: string,
  condition: 'eq' | 'gt' | 'gte' | 'lt' | 'lte',
  amount: number | bigint | string
): FungiblePostCondition {
  const [_addr, _name] = sender.split('.');
  const [ftType] = contract.fungible_tokens;
  const asset = createAssetInfo(contract, ftType!.name);
  return {
    type: 'ft-postcondition',
    address: sender,
    condition,
    asset,
    amount,
  };
}
