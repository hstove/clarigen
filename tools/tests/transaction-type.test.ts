import type { OperationResponse } from '@stacks/blockchain-api-client';
import { StacksTransaction } from '../src/types/stacks-transaction';
import { test, expect } from 'vitest';
import { type } from 'arktype';

export type StacksTranactionResponse =
  OperationResponse['get_transaction_by_id'];

test('StacksTransaction type is compatible with api', () => {
  function doSomething(_tx: StacksTranactionResponse) {}

  const t = {} as unknown as typeof StacksTransaction.infer;

  doSomething(t);
});

test('type validation works for a real api request', async () => {
  const txid =
    '0x4334efdc554bd37593ade7119608799187a3f11215585e4c3b5f68be2ce51256';
  const url = await fetch(`https://api.hiro.so/extended/v1/tx/${txid}`);
  const data = await url.json();
  const tx = StacksTransaction(data);
  if (tx instanceof type.errors) {
    throw new Error('Invalid test');
  }
  expect((tx as StacksTranactionResponse).tx_id).toBe(txid);
});
