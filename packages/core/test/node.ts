import { AnchorMode, PostConditionMode, makeContractCall } from '@stacks/transactions';
import { project } from './generated/clarigen-types';
import { projectFactory } from '../src';
import { test } from 'vitest';

const contracts = projectFactory(project, 'devnet');

test('can create a signed transaciton', async () => {
  const tx = await makeContractCall({
    ...contracts.counter.increment(1n),
    network: 'devnet',
    nonce: 0,
    fee: 10000,
    senderKey: '753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601',
    anchorMode: AnchorMode.Any,
  });
});
