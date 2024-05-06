import type {
  TypedAbiArg,
  TypedAbiFunction,
  TypedAbiMap,
  TypedAbiVariable,
  Response,
  ClarityAbiTypeNonFungibleToken,
  // ClarityAbiType,
  ClarityAbiTypeUInt128,
  ClarityAbiTypeBool,
} from '@clarigen/core';
import { contractsFactory } from '@clarigen/core';
import { test, expect } from 'vitest';

export type ClarityAbiType = ClarityAbiTypeTuple | ClarityAbiTypeUInt128 | ClarityAbiTypeBool;

// export type ClarityAbiTypeTuple = {
//   tuple: { name: string; type: ClarityAbiType }[];
// };
export type ClarityAbiTypeTuple = {
  tuple:
    | readonly { name: string; type: ClarityAbiType }[]
    | { name: string; type: ClarityAbiType }[];
};

// type Mutable<T> = {
//   -readonly [P in keyof T]: Mutable<T[P]>;
// };

const tupleType = {
  tuple: [
    { name: 'a', type: 'uint128' },
    { name: 'b', type: 'bool' },
  ],
} as const;

const b: ClarityAbiType = tupleType;

const nfts = [
  { name: 'nft', type: 'uint128' },
  {
    name: 'tuple-nft',
    type: {
      tuple: [
        { name: 'a', type: 'uint128' },
        { name: 'b', type: 'bool' },
      ],
    },
  },
] as const;

// let nftsTypes: ClarityAbiTypeNonFungibleToken[] = nfts;

const testContracts = {
  tester: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [
      {
        name: 'tuple-nft',
        type: {
          tuple: [
            { name: 'a', type: 'uint128' },
            { name: 'b', type: 'bool' },
          ],
        },
      },
      // ],
    ],
    fungible_tokens: [],
    epoch: 'Epoch21',
    clarity_version: 'Clarity1',
    contractName: 'tester',
  },
} as const;

const { tester } = contractsFactory(testContracts, 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM');

test('factory typings', () => {
  expect(tester.identifier).toEqual('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.tester');
});
