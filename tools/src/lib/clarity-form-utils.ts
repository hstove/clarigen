/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import { type ClarityValue, hexToCV, ClarityType } from '@stacks/transactions';
import {
  type ClarityAbiArg,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  formValueToCV,
  principalToString,
  type ClarityAbiType,
} from '@clarigen/core';

/**
 * Converts a single form value to a ClarityValue using the ABI type.
 * @deprecated Use formValueToCV from @clarigen/core
 */
export { formValueToCV };

export function getDefaultValueForType(type: ClarityAbiType): unknown {
  if (typeof type === 'string') {
    // biome-ignore lint/style/useDefaultSwitchClause: ignored using `--suppress`
    switch (type) {
      case 'bool':
        return false;
      case 'uint128':
      case 'int128':
      case 'principal':
      case 'trait_reference':
        return '';
      case 'none':
        return null;
    }
  }
  if ('buffer' in type) return '';
  if ('string-ascii' in type) return '';
  if ('string-utf8' in type) return '';
  if ('optional' in type) return { isNone: true, value: null };
  if ('response' in type)
    return {
      isOk: true,
      ok: getDefaultValueForType(type.response.ok),
      err: getDefaultValueForType(type.response.error),
    };
  if ('list' in type) return [];
  if ('tuple' in type) {
    const obj: Record<string, unknown> = {};
    for (const member of type.tuple) {
      obj[member.name] = getDefaultValueForType(member.type);
    }
    return obj;
  }
  return '';
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

/**
 * Converts a ClarityValue to a format suitable for the transaction builder form.
 */
export function cvToFormValue(val: ClarityValue): unknown {
  switch (val.type) {
    case ClarityType.BoolTrue:
      return true;
    case ClarityType.BoolFalse:
      return false;
    case ClarityType.Int:
    case ClarityType.UInt:
      return val.value.toString();
    case ClarityType.Buffer:
      return val.value;
    case ClarityType.OptionalNone:
      return { isNone: true, value: null };
    case ClarityType.OptionalSome:
      return { isNone: false, value: cvToFormValue(val.value) };
    case ClarityType.ResponseErr:
      return { isOk: false, ok: null, err: cvToFormValue(val.value) };
    case ClarityType.ResponseOk:
      return { isOk: true, ok: cvToFormValue(val.value), err: null };
    case ClarityType.PrincipalStandard:
    case ClarityType.PrincipalContract:
      return principalToString(val);
    case ClarityType.List:
      return val.value.map((v) => cvToFormValue(v));
    case ClarityType.Tuple:
      return Object.entries(val.value).reduce(
        (acc, [key, v]) => ({
          // biome-ignore lint/performance/noAccumulatingSpread: ignored using `--suppress`
          ...acc,
          [key]: cvToFormValue(v),
        }),
        {}
      );
    case ClarityType.StringASCII:
    case ClarityType.StringUTF8:
      return val.value;
    default:
      return null;
  }
}

/**
 * Converts transaction arguments from the Stacks API (hex encoded) back to form values.
 */
export function txArgsToFormValues(
  args: { name: string; hex: string }[]
): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const arg of args) {
    const cv = hexToCV(arg.hex);
    values[arg.name] = cvToFormValue(cv);
  }
  return values;
}
