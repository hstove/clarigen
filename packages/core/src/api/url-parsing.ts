import {
  type ClarityValue,
  responseOkCV,
  responseErrorCV,
} from '@stacks/transactions';
import {
  type ClarityAbiType,
  type ClarityAbiArg,
  parseToCV,
  isClarityAbiOptional,
  isClarityAbiBuffer,
  isClarityAbiTuple,
  isClarityAbiList,
  isClarityAbiResponse,
  isClarityAbiPrimitive,
} from '../clarity-types';
import { hexToBytes } from '../utils';

export type OptionalFormValue = { isNone: boolean; value: unknown };
export type ResponseFormValue = {
  isOk: boolean;
  value?: unknown;
  ok?: unknown;
  err?: unknown;
};

export function isOptionalFormValue(
  value: unknown
): value is OptionalFormValue {
  return (
    typeof value === 'object' &&
    value !== null &&
    'isNone' in value &&
    typeof (value as OptionalFormValue).isNone === 'boolean'
  );
}

export function isResponseFormValue(
  value: unknown
): value is ResponseFormValue {
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

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: ignored using `--suppress`
export function formValueToParseable(
  value: unknown,
  type: ClarityAbiType
): unknown {
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
      const hex = value.startsWith('0x') ? value.slice(2) : value;
      return hexToBytes(hex);
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
export function formValueToCV(
  value: unknown,
  type: ClarityAbiType
): ClarityValue {
  // Handle response types directly since parseToCV doesn't support them
  if (isClarityAbiResponse(type)) {
    if (!isResponseFormValue(value)) {
      throw new Error(
        'Response type requires { isOk: boolean, value: unknown } form value'
      );
    }
    const innerType = value.isOk ? type.response.ok : type.response.error;
    const innerValue = value.isOk
      ? (value.ok ?? value.value)
      : (value.err ?? value.value);
    const innerCV = formValueToCV(innerValue, innerType);
    return value.isOk ? responseOkCV(innerCV) : responseErrorCV(innerCV);
  }

  const parseable = formValueToParseable(value, type);
  // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
  return parseToCV(parseable as any, type);
}

/**
 * Parses a raw string value from a URL query parameter into a "form value"
 * based on the Clarity ABI type. This intermediate form value can then
 * be converted to a ClarityValue using `formValueToCV`.
 */

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: ignored using `--suppress`
export function parseQueryValue(
  value: string | undefined,
  type: ClarityAbiType
): unknown {
  if (value === undefined || value === '') {
    if (isClarityAbiOptional(type)) return { isNone: true, value: null };
    if (isClarityAbiList(type)) return [];
    if (isClarityAbiTuple(type)) return {}; // Will be filled with defaults by downstream logic if needed
    if (isClarityAbiPrimitive(type) && type === 'bool') return false;
    return '';
  }

  // If it's a principal and starts with ', strip it
  if (type === 'principal' && value.startsWith("'")) {
    return value.slice(1);
  }

  if (
    isClarityAbiOptional(type) ||
    isClarityAbiList(type) ||
    isClarityAbiTuple(type) ||
    isClarityAbiResponse(type)
  ) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  if (isClarityAbiPrimitive(type) && type === 'bool') {
    return value === 'true';
  }

  return value;
}

/**
 * Converts all query parameters to an array of ClarityValues based on the function's ABI args.
 */
export function queryToFunctionArgs(
  query: Record<string, string | string[] | undefined>,
  args: ClarityAbiArg[]
): ClarityValue[] {
  return args.map((arg) => {
    const rawValue = query[arg.name];
    const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;
    const formValue = parseQueryValue(value, arg.type);
    return formValueToCV(formValue, arg.type);
  });
}
