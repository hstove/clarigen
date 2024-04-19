import { ClarityValue, ReadOnlyFunctionResponse, cvToHex, hexToCV } from '@stacks/transactions';
import { smartContractsApi } from './api-helpers';

export interface ReadOnlyOptions {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: (string | ClarityValue)[];
  /** address of the sender (can be left blank, will default to contract address) */
  senderAddress?: string;
  /** the network that the contract which contains the function is deployed to */
  // network?: StacksNetwork;
  url: string;
  tip?: string;
}

/**
 * Converts the response of a read-only function call into its Clarity Value
 * @param response - {@link ReadOnlyFunctionResponse}
 */
export function parseReadOnlyResponse<T extends ClarityValue>(
  response: ReadOnlyFunctionResponse
): T {
  if (response.okay) {
    return hexToCV(response.result) as T;
  } else {
    throw new Error(response.cause);
  }
}

// export type ReadOnlyOptions = Omit<ReadOnlyFunctionOptions, 'network'> & {
//   url: string;
// };

/**
 * Calls a read only function from a contract interface
 *
 * @param options - the options object
 *
 * Returns an ClarityValue
 *
 */
export async function callReadOnlyFunction<T extends ClarityValue>(
  options: ReadOnlyOptions
): Promise<T> {
  const { contractAddress, functionArgs, senderAddress = contractAddress, url } = options;

  // const contractsApi = new
  const apiResponse = await smartContractsApi(url).callReadOnlyFunction({
    ...options,
    readOnlyFunctionArgs: {
      sender: senderAddress,
      arguments: functionArgs.map(arg => (typeof arg === 'string' ? arg : cvToHex(arg))),
    },
  });

  const cv = parseReadOnlyResponse<T>(apiResponse as ReadOnlyFunctionResponse);
  return cv;
}
