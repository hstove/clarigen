import { type Response, cvToValue, isResponse } from '@clarigen/core';
import {
  type ClarityValue as HiroClarityValue,
  deserializeCV as deserializeCVHiro,
  serializeCV as serializeCVHiro,
} from '@stacks/transactions';
import {
  type ClarityValue as MSClarityValue,
  serializeCV as serializeCVMS,
  deserializeCV as deserializeCVMS,
} from '@stacks/transactions';

export function cvConvertMS(value: MSClarityValue): HiroClarityValue {
  return deserializeCVHiro(serializeCVMS(value));
}

export function cvConvertHiro(value: HiroClarityValue): MSClarityValue {
  return deserializeCVMS(serializeCVHiro(value));
}

export function validateResponse<T>(
  result: HiroClarityValue,
  expectOk?: boolean
): T {
  const value = cvToValue<Response<T, T> | T>(cvConvertHiro(result), true);

  if (!isResponse(value) && typeof expectOk !== 'undefined') {
    throw new Error(
      'Expected response when calling function, but not a response. Try using just `rov`'
    );
  }

  if (isResponse(value) && typeof expectOk !== 'undefined') {
    const response = value;
    const inner = response.value;
    if (expectOk && !response.isOk) {
      throw new Error(
        `Tx result failed. Expected OK, received ERR ${String(inner)}.`
      );
    }
    if (expectOk === false && response.isOk) {
      throw new Error(
        `Tx result failed. Expected ERR, received OK ${String(inner)}.`
      );
    }
    return inner;
  }
  return value as T;
}
