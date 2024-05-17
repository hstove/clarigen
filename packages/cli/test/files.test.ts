import { generateAccountsCode } from '../src/files/accounts';
import { SessionAccount } from '../src/session';
import { describe, expect, test } from 'vitest';

test('accounts are sorted before serialization', async () => {
  const accounts: SessionAccount[] = [
    {
      name: 'wallet_2',
      balance: '100',
      address: 'aaa',
    },
    {
      name: 'wallet_1',
      balance: '200',
      address: 'bbb',
    },
  ];
  const serialized = JSON.parse(generateAccountsCode(accounts));
  console.log('serialized', serialized);
  expect(Object.keys(serialized)[0]).toEqual('wallet_1');
  expect(serialized.wallet_1).toEqual({
    balance: '200',
    address: 'bbb',
  });
});
