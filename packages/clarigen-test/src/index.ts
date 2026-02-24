/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import {
  type ContractCallTyped,
  type ErrType,
  type OkType,
  type TypedAbiMap,
  type TypedAbiVariable,
  type UnknownArgs,
  cvToValue,
  mapFactory,
  type Response,
  cvToString,
  type ResponseOk,
  type ResponseErr,
  isResponse,
} from '@clarigen/core';
import type { ContractCallTransaction } from '@clarigen/core/deployment';
import type { ParsedTransactionResult } from '@stacks/clarinet-sdk';
import { cvConvertHiro, cvConvertMS, validateResponse } from './utils';
import type { CoreNodeEvent } from './events';
import { stringify } from 'yaml';
import type { ClarityValue } from '@stacks/transactions';
// biome-ignore lint/performance/noBarrelFile: ignored using `--suppress`
export * from './events';
export * from './utils';

export type TransactionResult<R> = Omit<ParsedTransactionResult, 'events'> & {
  value: R;
  events: CoreNodeEvent[];
};

export type AnyResponse = Response<unknown, unknown>;

function logTxCall({
  contractId,
  sender,
  args,
  functionName,
}: {
  contractId: string;
  sender: string;
  args: ClarityValue[];
  functionName: string;
}) {
  if (process.env.LOG_TX_CALLS) {
    const contractCallTx: ContractCallTransaction = {
      'contract-call': {
        'contract-id': contractId,
        'expected-sender': sender,
        parameters: args.map((arg) => cvToString(arg, 'hex')),
        method: functionName,
        cost: '10000000',
      },
    };
    console.log('------------ DEPLOYMENT TX ------------');
    console.log(stringify(contractCallTx, { indent: 2 }));
    console.log('------------ END DEPLOYMENT TX ------------');
  }
}

export function txOk<A extends UnknownArgs, R extends AnyResponse>(
  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  tx: ContractCallTyped<A, R>,
  sender: string
): TransactionResult<OkType<R>> {
  const receipt = getTxReceipt(tx, sender);
  const value = validateResponse<OkType<R>>(receipt.result, true);

  return {
    ...receipt,
    events: receipt.events as unknown as CoreNodeEvent[],
    value,
  };
}

export function txErr<A extends UnknownArgs, R extends AnyResponse>(
  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  tx: ContractCallTyped<A, R>,
  sender: string
): TransactionResult<ErrType<R>> {
  const receipt = getTxReceipt(tx, sender);
  const value = validateResponse<ErrType<R>>(receipt.result, false);

  return {
    ...receipt,
    events: receipt.events as unknown as CoreNodeEvent[],
    value,
  };
}

export function tx<A extends UnknownArgs, R extends AnyResponse>(
  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  tx: ContractCallTyped<A, R>,
  sender: string
): TransactionResult<R> {
  const receipt = getTxReceipt(tx, sender);
  const value = validateResponse<R>(receipt.result);

  return {
    ...receipt,
    events: receipt.events as unknown as CoreNodeEvent[],
    value,
  };
}

function getTxReceipt<A extends UnknownArgs, R extends AnyResponse>(
  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  tx: ContractCallTyped<A, R>,
  sender: string
): ParsedTransactionResult {
  const args = tx.functionArgs;
  const contractId = `${tx.contractAddress}.${tx.contractName}`;
  let receipt: ParsedTransactionResult;
  if (tx.function.access === 'private') {
    // biome-ignore lint/correctness/noUndeclaredVariables: ignored using `--suppress`
    receipt = simnet.callPrivateFn(contractId, tx.function.name, args, sender);
  } else {
    // biome-ignore lint/correctness/noUndeclaredVariables: ignored using `--suppress`
    receipt = simnet.callPublicFn(contractId, tx.function.name, args, sender);
  }
  logTxCall({ contractId, sender, args, functionName: tx.function.name });
  return receipt;
}

export function ro<A extends UnknownArgs, R>(
  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  tx: ContractCallTyped<A, R>,
  sender?: string
): TransactionResult<R> {
  const args = tx.functionArgs.map(cvConvertMS);
  const contractId = `${tx.contractAddress}.${tx.contractName}`;
  // biome-ignore lint/correctness/noUndeclaredVariables: ignored using `--suppress`
  const receipt = simnet.callReadOnlyFn(
    contractId,
    tx.function.name,
    args,
    sender ?? tx.contractAddress
  );
  const value = validateResponse<R>(receipt.result);
  return {
    ...receipt,
    events: receipt.events as unknown as CoreNodeEvent[],
    value,
  };

  // return value;
}

export function rov<A extends UnknownArgs, R>(
  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  tx: ContractCallTyped<A, R>,
  sender?: string
): R {
  return ro(tx, sender).value;
}

export function roOk<A extends UnknownArgs, R extends AnyResponse>(
  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  tx: ContractCallTyped<A, R>,
  sender?: string
): TransactionResult<OkType<R>> {
  const args = tx.functionArgs.map(cvConvertMS);
  const contractId = `${tx.contractAddress}.${tx.contractName}`;
  // biome-ignore lint/correctness/noUndeclaredVariables: ignored using `--suppress`
  const receipt = simnet.callReadOnlyFn(
    contractId,
    tx.function.name,
    args,
    sender ?? tx.contractAddress
  );
  const value = validateResponse<OkType<R>>(receipt.result, true);
  return {
    ...receipt,
    events: receipt.events as unknown as CoreNodeEvent[],
    value,
  };

  // return value;
}

export function rovOk<A extends UnknownArgs, R extends AnyResponse>(
  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  tx: ContractCallTyped<A, R>,
  sender?: string
): OkType<R> {
  return roOk(tx, sender).value;
}

export function roErr<A extends UnknownArgs, R extends AnyResponse>(
  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  tx: ContractCallTyped<A, R>,
  sender?: string
): TransactionResult<ErrType<R>> {
  const args = tx.functionArgs.map(cvConvertMS);
  const contractId = `${tx.contractAddress}.${tx.contractName}`;
  // biome-ignore lint/correctness/noUndeclaredVariables: ignored using `--suppress`
  const receipt = simnet.callReadOnlyFn(
    contractId,
    tx.function.name,
    args,
    sender ?? tx.contractAddress
  );
  const value = validateResponse<ErrType<R>>(receipt.result, false);

  return {
    ...receipt,
    events: receipt.events as unknown as CoreNodeEvent[],
    value,
  };

  // return value;
}

export function rovErr<A extends UnknownArgs, R extends AnyResponse>(
  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  tx: ContractCallTyped<A, R>,
  sender?: string
): ErrType<R> {
  return roErr(tx, sender).value;
}

export function mapGet<Key, Val>(
  contractId: string,
  map: TypedAbiMap<Key, Val>,
  key: Key
) {
  const payload = mapFactory(map, key);
  // biome-ignore lint/correctness/noUndeclaredVariables: ignored using `--suppress`
  const result = simnet.getMapEntry(
    contractId,
    payload.map.name,
    cvConvertMS(payload.keyCV)
  );
  return cvToValue<Val | null>(cvConvertHiro(result));
}

export function varGet<T>(contractId: string, variable: TypedAbiVariable<T>) {
  // biome-ignore lint/correctness/noUndeclaredVariables: ignored using `--suppress`
  const result = simnet.getDataVar(contractId, variable.name);
  return cvToValue<T>(cvConvertHiro(result));
}

// Helper export for previous Deno-based tests
export const chain = {
  txOk,
  txErr,
  tx,
  ro,
  roOk,
  roErr,
  rov,
  rovOk,
  rovErr,
};

export async function makeNewSession(cwd?: string, manifestPath?: string) {
  // biome-ignore lint/correctness/noUndeclaredVariables: ignored using `--suppress`
  await simnet.initSession(
    cwd ?? process.cwd(),
    manifestPath ?? './Clarinet.toml'
  );
}

export function assertOk<T extends ResponseOk<O, E> | ResponseErr<O, E>, O, E>(
  response: T | unknown
): asserts response is ResponseOk<O, E> {
  if (!isResponse(response)) {
    throw new Error('Expected response, but got something else');
  }
  if (!response.isOk) {
    throw new Error(
      `Expected response to be OK, but got ERR ${response.value}`
    );
  }
}

export function assertErr<T extends ResponseOk<O, E> | ResponseErr<O, E>, O, E>(
  response: T | unknown
): asserts response is ResponseErr<O, E> {
  if (!isResponse(response)) {
    throw new Error('Expected response, but got something else');
  }
  if (response.isOk) {
    throw new Error('Expected response to be ERR, but got OK');
  }
}
