import { ClarityValue, responseOkCV, responseErrorCV } from '@stacks/transactions';
import {
  ClarityAbiType,
  ClarityAbiArg,
  parseToCV,
  isClarityAbiOptional,
  isClarityAbiBuffer,
  isClarityAbiTuple,
  isClarityAbiList,
  isClarityAbiResponse,
} from '@clarigen/core';
import { hexToBytes } from 'viem';

type OptionalFormValue = { isNone: boolean; value: unknown };
type ResponseFormValue = { isOk: boolean; value: unknown };

function isOptionalFormValue(value: unknown): value is OptionalFormValue {
  return (
    typeof value === 'object' &&
    value !== null &&
    'isNone' in value &&
    typeof (value as OptionalFormValue).isNone === 'boolean'
  );
}

function isResponseFormValue(value: unknown): value is ResponseFormValue {
  return (
    typeof value === 'object' &&
    value !== null &&
    'isOk' in value &&
    typeof (value as ResponseFormValue).isOk === 'boolean'
  );
}

/**
 * Converts a form value to the format expected by parseToCV.
 * Handles differences between form representation and parseToCV expectations:
 * - Optionals use { isNone, value } in forms but null for none in parseToCV
 * - Buffers are hex strings in forms but Uint8Array in parseToCV
 */
function formValueToParseable(value: unknown, type: ClarityAbiType): unknown {
  if (isClarityAbiOptional(type)) {
    if (isOptionalFormValue(value)) {
      if (value.isNone) {
        return null;
      }
      return formValueToParseable(value.value, type.optional);
    }
    // Already in parseable format (null or direct value)
    return value;
  }

  if (isClarityAbiBuffer(type)) {
    if (typeof value === 'string') {
      const hex = value.startsWith('0x') ? value : `0x${value}`;
      return hexToBytes(hex as `0x${string}`);
    }
    return value;
  }

  if (isClarityAbiTuple(type)) {
    if (typeof value !== 'object' || value === null) {
      return value;
    }
    const result: Record<string, unknown> = {};
    for (const member of type.tuple) {
      const memberValue = (value as Record<string, unknown>)[member.name];
      result[member.name] = formValueToParseable(memberValue, member.type);
    }
    return result;
  }

  if (isClarityAbiList(type)) {
    if (!Array.isArray(value)) {
      return value;
    }
    return value.map((item) => formValueToParseable(item, type.list.type));
  }

  return value;
}

/**
 * Converts a single form value to a ClarityValue using the ABI type.
 */
export function formValueToCV(value: unknown, type: ClarityAbiType): ClarityValue {
  // Handle response types directly since parseToCV doesn't support them
  if (isClarityAbiResponse(type)) {
    if (!isResponseFormValue(value)) {
      throw new Error('Response type requires { isOk: boolean, value: unknown } form value');
    }
    const innerType = value.isOk ? type.response.ok : type.response.error;
    const innerCV = formValueToCV(value.value, innerType);
    return value.isOk ? responseOkCV(innerCV) : responseErrorCV(innerCV);
  }

  const parseable = formValueToParseable(value, type);
  // parseToCV accepts CVInput which is string | boolean | object | number | bigint
  // Our form values are always one of these after transformation
  return parseToCV(parseable as Parameters<typeof parseToCV>[0], type);
}

/**
 * Converts all form values to an array of ClarityValues based on the function's ABI args.
 * Returns the array in the same order as the args definition.
 */
export function formValuesToFunctionArgs(
  formValues: Record<string, unknown>,
  args: ClarityAbiArg[]
): ClarityValue[] {
  return args.map((arg) => {
    const value = formValues[arg.name];
    return formValueToCV(value, arg.type);
  });
}
