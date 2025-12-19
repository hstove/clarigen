import type {
  // ClarityAbiType,
  ClarityAbiTypeUInt128,
  ClarityAbiTypeBool,
} from '../src';
import { contractsFactory } from '../src';
import { test, expect } from 'vitest';

// biome-ignore lint/suspicious/noExportsInTest: ignored using `--suppress`
export type ClarityAbiType =
  | ClarityAbiTypeTuple
  | ClarityAbiTypeUInt128
  | ClarityAbiTypeBool;

// export type ClarityAbiTypeTuple = {
//   tuple: { name: string; type: ClarityAbiType }[];
// };
// biome-ignore lint/suspicious/noExportsInTest: ignored using `--suppress`
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

const _b: ClarityAbiType = tupleType;

const _nfts = [
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

const { tester } = contractsFactory(
  testContracts,
  'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
);

test('factory typings', () => {
  expect(tester.identifier).toEqual(
    'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.tester'
  );
});
