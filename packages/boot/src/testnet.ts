import { TESTNET_BURN_ADDRESS, contractsFactory } from '@clarigen/core';
import { contracts } from './clarigen-types';

export const testnet = contractsFactory(contracts, TESTNET_BURN_ADDRESS);

export const {
  pox4,
  pox3,
  pox2,
  pox,
  bns,
  signersVoting,
  signers,
  costs,
  costs2,
  costs3,
  costVoting,
  lockup,
} = testnet;
