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
  apiKey?: string;
  headers?: Record<string, string>;
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

  const apiResponse = await smartContractsApi(
    url,
    options.apiKey,
    options.headers
  ).callReadOnlyFunction({
    ...options,
    readOnlyFunctionArgs: {
      sender: senderAddress,
      arguments: functionArgs.map(arg => (typeof arg === 'string' ? arg : cvToHex(arg))),
    },
  });

  const cv = parseReadOnlyResponse<T>(apiResponse as ReadOnlyFunctionResponse);
  return cv;
}
