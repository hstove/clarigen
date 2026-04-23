import {
  type Response,
  type TypedAbi,
  cvToValue,
  extractErrors,
  isResponse,
} from '@clarigen/core';
import type { ClarityValue } from '@stacks/transactions';

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: allowed
export function validateResponse<T>(
  result: ClarityValue,
  expectOk?: boolean,
  contractAbi?: TypedAbi
): T {
  const value = cvToValue<Response<T, T> | T>(result, true);

  if (!isResponse(value) && typeof expectOk !== 'undefined') {
    throw new Error(
      'Expected response when calling function, but not a response. Try using just `rov`'
    );
  }

  if (isResponse(value) && typeof expectOk !== 'undefined') {
    const response = value;
    const inner = response.value;
    if (expectOk && !response.isOk) {
      // try and find a matching error code
      let errorCode = '';
      if (contractAbi) {
        const match = Object.entries(extractErrors(contractAbi)).find(
          ([_key, code]) => code === inner
        );
        if (match) {
          errorCode = ` (${match[0]})`;
        }
      }
      throw new Error(
        `Tx result failed. Expected OK, received ERR ${String(inner)}${errorCode}.`
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
