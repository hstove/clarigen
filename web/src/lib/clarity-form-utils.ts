import { ClarityValue } from '@stacks/transactions';
import { ClarityAbiArg, formValueToCV } from '@clarigen/core';

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
