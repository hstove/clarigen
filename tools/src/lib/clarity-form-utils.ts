import { ClarityValue, hexToCV, ClarityType } from '@stacks/transactions';
import { ClarityAbiArg, formValueToCV, principalToString } from '@clarigen/core';

/**
 * Converts a single form value to a ClarityValue using the ABI type.
 * @deprecated Use formValueToCV from @clarigen/core
 */
export { formValueToCV };

/**
 * Converts all form values to an array of ClarityValues based on the function's ABI args.
 * Returns the array in the same order as the args definition.
 */
export function formValuesToFunctionArgs(
  formValues: Record<string, unknown>,
  args: ClarityAbiArg[]
): ClarityValue[] {
  return args.map(arg => {
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
    case ClarityType.ResponseOk:
      return cvToFormValue(val.value);
    case ClarityType.PrincipalStandard:
    case ClarityType.PrincipalContract:
      return principalToString(val);
    case ClarityType.List:
      return val.value.map(v => cvToFormValue(v));
    case ClarityType.Tuple:
      return Object.entries(val.value).reduce((acc, [key, v]) => {
        return {
          ...acc,
          [key]: cvToFormValue(v),
        };
      }, {});
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
export function txArgsToFormValues(args: { name: string; hex: string }[]): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const arg of args) {
    const cv = hexToCV(arg.hex);
    values[arg.name] = cvToFormValue(cv);
  }
  return values;
}
