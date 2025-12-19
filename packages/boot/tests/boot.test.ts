import { mainnet, pox4 as mainnetPox4 } from '../src/mainnet';
import { testnet } from '../src/testnet';
import { mainnet as mainnetRoot, testnet as testnetRoot } from '../src';
import { it, expect, describe } from 'vitest';
import { accounts } from '../src/clarigen-types';
import { MAINNET_BURN_ADDRESS } from '@clarigen/core';

const alice = accounts.wallet_1.address;

describe('boot contracts package', () => {
  it('has the right identifiers', () => {
    expect(mainnet.pox4.identifier).toEqual(mainnetRoot.pox4.identifier);
    expect(testnet.pox4.identifier).toEqual(testnetRoot.pox4.identifier);
  });

  it('exposes the right factories', () => {
    const pox4 = mainnet.pox4;
    const call = pox4.getDelegationInfo(alice);
    expect(call.contractAddress).toEqual(MAINNET_BURN_ADDRESS);
  });

  it('exposes individual contracts', () => {
    expect(mainnetPox4.identifier).toEqual(`${MAINNET_BURN_ADDRESS}.pox-4`);
  });
});
