import { Pc } from '@stacks/transactions';
import type { PostCondition } from '@stacks/transactions';

// Comparators for fungible assets (STX and FT)
export type FungibleComparator = 'eq' | 'gt' | 'gte' | 'lt' | 'lte';

// Comparators for NFT
export type NonFungibleComparator = 'sent' | 'not-sent';

export type PostConditionType = 'stx' | 'ft' | 'nft';

export type StxPostConditionForm = {
  type: 'stx';
  address: string;
  condition: FungibleComparator;
  amount: string;
};

export type FtPostConditionForm = {
  type: 'ft';
  address: string;
  condition: FungibleComparator;
  asset: string; // contract.token-name
  amount: string;
};

export type NftPostConditionForm = {
  type: 'nft';
  address: string;
  condition: NonFungibleComparator;
  asset: string; // contract.nft-name
  assetId: string; // Clarity value representation
};

export type PostConditionForm =
  | StxPostConditionForm
  | FtPostConditionForm
  | NftPostConditionForm;

export type PostConditionsState = {
  mode: 'allow' | 'deny';
  conditions: PostConditionForm[];
};

export const DEFAULT_POST_CONDITIONS_STATE: PostConditionsState = {
  mode: 'deny',
  conditions: [],
};

export function createEmptyStxCondition(): StxPostConditionForm {
  return {
    type: 'stx',
    address: '',
    condition: 'eq',
    amount: '',
  };
}

export function createEmptyFtCondition(): FtPostConditionForm {
  return {
    type: 'ft',
    address: '',
    condition: 'eq',
    asset: '',
    amount: '',
  };
}

export function createEmptyNftCondition(): NftPostConditionForm {
  return {
    type: 'nft',
    address: '',
    condition: 'sent',
    asset: '',
    assetId: '',
  };
}

// Build actual post-conditions from form state
export function buildPostConditions(
  conditions: PostConditionForm[]
): PostCondition[] {
  return conditions
    .filter((pc) => pc.address) // Skip empty conditions
    .map((pc) => {
      const principal = Pc.principal(pc.address);

      if (pc.type === 'stx') {
        if (!pc.amount) return null;
        const amount = BigInt(pc.amount);
        switch (pc.condition) {
          case 'eq':
            return principal.willSendEq(amount).ustx();
          case 'gt':
            return principal.willSendGt(amount).ustx();
          case 'gte':
            return principal.willSendGte(amount).ustx();
          case 'lt':
            return principal.willSendLt(amount).ustx();
          case 'lte':
            return principal.willSendLte(amount).ustx();
        }
      }

      if (pc.type === 'ft') {
        if (!(pc.amount && pc.asset)) return null;
        const amount = BigInt(pc.amount);
        const [contractId, tokenName] = pc.asset.split('::');
        if (!(contractId && tokenName)) return null;

        switch (pc.condition) {
          case 'eq':
            return principal
              .willSendEq(amount)
              .ft(contractId as `${string}.${string}`, tokenName);
          case 'gt':
            return principal
              .willSendGt(amount)
              .ft(contractId as `${string}.${string}`, tokenName);
          case 'gte':
            return principal
              .willSendGte(amount)
              .ft(contractId as `${string}.${string}`, tokenName);
          case 'lt':
            return principal
              .willSendLt(amount)
              .ft(contractId as `${string}.${string}`, tokenName);
          case 'lte':
            return principal
              .willSendLte(amount)
              .ft(contractId as `${string}.${string}`, tokenName);
        }
      }

      if (pc.type === 'nft') {
        if (!(pc.asset && pc.assetId)) return null;
        const [contractId, nftName] = pc.asset.split('::');
        if (!(contractId && nftName)) return null;

        // For NFT, assetId needs to be a ClarityValue - for now use uintCV
        // The user should enter just the numeric ID
        const { uintCV } = require('@stacks/transactions');
        const assetIdCV = uintCV(BigInt(pc.assetId));

        switch (pc.condition) {
          case 'sent':
            return principal
              .willSendAsset()
              .nft(contractId as `${string}.${string}`, nftName, assetIdCV);
          case 'not-sent':
            return principal
              .willNotSendAsset()
              .nft(contractId as `${string}.${string}`, nftName, assetIdCV);
        }
      }

      return null;
    })
    .filter((pc): pc is PostCondition => pc !== null);
}

export const FUNGIBLE_COMPARATORS: {
  value: FungibleComparator;
  label: string;
}[] = [
  { value: 'eq', label: '= (equal)' },
  { value: 'gt', label: '> (greater than)' },
  { value: 'gte', label: '>= (greater or equal)' },
  { value: 'lt', label: '< (less than)' },
  { value: 'lte', label: '<= (less or equal)' },
];

export const NFT_COMPARATORS: {
  value: NonFungibleComparator;
  label: string;
}[] = [
  { value: 'sent', label: 'will send' },
  { value: 'not-sent', label: 'will not send' },
];
