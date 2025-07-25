import { createLPString, uintCV } from '@stacks/transactions';
import {
  FungibleConditionCode,
  NonFungibleConditionCode,
  PostConditionType,
} from '@stacks/transactions';
import { project } from './generated/clarigen-types';
import {
  AssetNames,
  createAssetInfo,
  makeFungiblePostCondition,
  makeNonFungiblePostCondition,
  NftAssetType,
  projectFactory,
} from '../src';
import { expect, test, describe } from 'vitest';
const devnet = projectFactory(project, 'devnet');

const contract = devnet.tester;

type Assets = AssetNames<typeof contract>;

// @ts-expect-error Type error for asset name
let assetName: Assets = 'incorrect-name';

assetName = 'ft';
assetName = 'nft';
assetName = 'tuple-nft';

// @ts-expect-error Invalid asset name
assetName = 'not-asset';

const [deployer, contractName] = contract.identifier.split('.');

test('throw if invalid asset name', () => {
  expect(() => {
    // @ts-expect-error Invalid asset name
    createAssetInfo(contract, 'non-asset');
  }).toThrow();
});

// @ts-expect-error Invalid asset type
const _nftId: NftAssetType<typeof contract> = 'asdf';

test('can create post condition', () => {
  const pc = makeNonFungiblePostCondition(contract, deployer, 'sent', 1n);
  if (pc.condition !== 'sent') {
    throw new Error('invalid');
  }
  expect(pc.assetId).toEqual(uintCV(1));
});

test('correct type errors', () => {
  expect(() => {
    makeNonFungiblePostCondition(
      contract,
      deployer,
      'sent',
      // @ts-expect-error Should fail types
      'asdf'
    );
  }).toThrowError();
});

test('works for ft', () => {
  const pc = makeFungiblePostCondition(contract, deployer, 'eq', 100);
  if (pc.type !== 'ft-postcondition') {
    throw new Error('Invalid');
  }
  if (pc.condition !== 'eq') {
    throw new Error('Invalid');
  }
});
