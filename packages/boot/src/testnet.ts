import { TESTNET_BURN_ADDRESS, contractsFactory } from '@clarigen/core';
import { contracts } from './clarigen-types';

export const testnet = contractsFactory(contracts, TESTNET_BURN_ADDRESS);
