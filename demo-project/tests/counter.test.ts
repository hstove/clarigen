/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
process.on('warning', (warning) => {
  console.warn(warning);
});

import { CoreNodeEventType, cvToValue, projectFactory } from '@clarigen/core';
import { accounts, project } from '../esm/index';
import {
  rov,
  txOk,
  txErr,
  ro,
  varGet,
  mapGet,
  filterEvents,
  tx,
} from '@clarigen/test';
import { describe, it, expect } from 'vitest';

const contracts = projectFactory(project, 'simnet');
const { counter } = contracts;
const alice = accounts.wallet_1.address;

describe('counter contract tests', () => {
  it('has a default value', () => {
    const initial = counter.constants.counter;
    expect(initial).toEqual(1n);
    const value = rov(counter.getCounter());
    expect(value).toEqual(initial);
    expect(ro(counter.getCounter()).value).toEqual(1n);
  });

  it('can increment', () => {
    const receipt = txOk(counter.increment(1n), alice);
    expect(receipt.value).toEqual(2n);
  });

  it('can increment more than 1', () => {
    const receipt = txOk(counter.increment(5n), alice);
    expect(receipt.value).toEqual(7n);
  });

  it('cannot increment by more than 5', () => {
    const receipt = txErr(counter.increment(6n), alice);
    expect(receipt.value).toEqual(100n);

    const responseReceipt = tx(counter.increment(6n), alice);
    expect(responseReceipt.value.isOk).toEqual(false);
  });

  it('can get the counter variable', () => {
    const value = varGet(counter.identifier, counter.variables.counter);
    expect(value).toEqual(7n);
  });

  it('can get info from the last-increment map', () => {
    const value = mapGet(counter.identifier, counter.maps.lastIncrement, alice);
    expect(value).toEqual(5n);
  });

  it('can get events from a tx', () => {
    const receipt = txOk(counter.increment(1n), alice);
    const printEvents = filterEvents(
      receipt.events,
      CoreNodeEventType.ContractEvent
    );
    expect(printEvents.length).toEqual(1);
    const [print] = printEvents;
    const printData = cvToValue<{
      action: string;
      object: string;
      value: bigint;
    }>(print.data.value);
    expect(printData).toEqual({
      action: 'incremented',
      object: 'counter',
      value: 8n,
    });
  });
});
