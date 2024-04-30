import { MAINNET_BURN_ADDRESS, contractsFactory } from '@clarigen/core';
import { contracts } from './clarigen-types';

export const mainnet = contractsFactory(contracts, MAINNET_BURN_ADDRESS);
