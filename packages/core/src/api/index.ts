import { cvToHex, hexToCV } from '@stacks/transactions';
import {
  StacksTransaction,
  broadcastRawTransaction,
  broadcastTransaction,
} from '@stacks/transactions';
import { cvToJSON, cvToValue, expectErr, expectOk, Jsonize } from '../clarity-types';
import { Response, TypedAbiMap } from '../abi-types';
import { ContractCall } from '../factory-types';
import { mapFactory } from '../factory';
import { callReadOnlyFunction } from './call-read-only';
import { generateUrl, v2Endpoint } from './api-helpers';
import { StacksNetwork, StacksNetworkName } from '@stacks/network';

export interface ApiOptionsUrl {
  url: string;
  network?: undefined;
}

export type Network = StacksNetwork | StacksNetworkName;

export interface ApiOptionsNetwork {
  network: StacksNetworkName | StacksNetwork;
  url?: undefined;
}

export type ApiOptionsBase = (ApiOptionsUrl | ApiOptionsNetwork) & {
  tip?: string;
  latest?: boolean;
};

export type ApiOptionsJsonize = ApiOptionsBase & {
  json: true;
};

export type ApiOptionsNoJson = ApiOptionsBase & {
  json?: false | undefined;
};

export type ApiOptions = ApiOptionsBase & {
  json?: boolean;
};

export type JsonIfOption<O extends ApiOptions, R> = O extends ApiOptionsJsonize ? Jsonize<R> : R;

// export type ApiOptions = ApiOptionsJsonize | ApiOptionsNoJson;

function getTip(options: ApiOptions): string | undefined {
  if (options.latest === false) return undefined;
  if (options.latest) return 'latest';
  if (typeof options.tip === 'undefined') return 'latest';
  return options.tip;
}

// export async function ro<O, T>(tx: ContractCall<T>, options: ApiOptionsJsonize): Promise<Jsonize<T>>;
// export async function ro<O, T>(tx: ContractCall<T>, options: ApiOptionsNoJson): Promise<T>;
export async function ro<O extends ApiOptions, T>(
  tx: ContractCall<T>,
  options: O
): Promise<JsonIfOption<O, T>> {
  const tip = getTip(options);
  const cv = await callReadOnlyFunction({
    contractAddress: tx.contractAddress,
    contractName: tx.contractName,
    functionName: tx.functionName,
    functionArgs: tx.functionArgs,
    tip,
    url: getApiUrl(options),
  });
  if (options.json) {
    return cvToJSON(cv);
  }
  return cvToValue(cv, true);
}

export async function roOk<O extends ApiOptions, Ok>(
  tx: ContractCall<Response<Ok, any>>,
  options: O
): Promise<JsonIfOption<O, Ok>> {
  const result = await ro(tx, options);
  return expectOk(result) as JsonIfOption<O, Ok>;
}

export async function roErr<O extends ApiOptions, Err>(
  tx: ContractCall<Response<any, Err>>,
  options: O
): Promise<JsonIfOption<O, Err>> {
  const result = await ro(tx, options);
  return expectErr(result) as JsonIfOption<O, Err>;
}

export function getApiUrl(opts: ApiOptionsUrl | ApiOptionsNetwork) {
  if (opts.network) {
    return StacksNetwork.fromNameOrNetwork(opts.network).coreApiUrl;
  }
  return opts.url;
}

export async function fetchMapGet<Key, Val>(
  contractId: string,
  map: TypedAbiMap<Key, Val>,
  key: Key,
  options: ApiOptions
): Promise<Val | null> {
  const payload = mapFactory(map, key);
  const lookupKey = JSON.stringify(cvToHex(payload.keyCV));
  const [addr, id] = contractId.split('.');
  const path = generateUrl(
    `${v2Endpoint(getApiUrl(options))}/map_entry/${addr}/${id}/${payload.map.name}`,
    {
      proof: 0,
      tip: getTip(options),
    }
  );
  const res = await fetch(path, {
    method: 'POST',
    body: lookupKey,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const data = (await res.json()) as { data: string };
  const valueCV = hexToCV(data.data);
  return cvToValue<Val | null>(valueCV, true);
}

export async function broadcast(transaction: StacksTransaction, options: ApiOptions) {
  const network = 'network' in options ? options.network : new StacksNetwork({ url: options.url });
  const result = await broadcastTransaction(transaction, network);
  if (result.error) {
    throw new Error(
      `Error broadcasting tx: ${result.error} - ${result.reason} - ${JSON.stringify(
        result.reason_data
      )}`
    );
  } else {
    return {
      txId: result.txid,
      stacksTransaction: transaction,
    };
  }
}

type ClientOptions = Omit<ApiOptions, 'url' | 'network'>;

type JsonIf<O extends ClientOptions, T> = JsonIfOption<O & (ApiOptionsUrl | ApiOptionsNetwork), T>;

export class ClarigenClient {
  public url: string;

  constructor(networkOrUrl: Network | string) {
    if (typeof networkOrUrl === 'string') {
      this.url = networkOrUrl;
    } else {
      this.url = StacksNetwork.fromNameOrNetwork(networkOrUrl).coreApiUrl;
    }
  }

  private roOptions(options: ClientOptions): ApiOptions {
    return {
      url: this.url,
      ...options,
    };
  }

  ro<T, O extends ClientOptions>(tx: ContractCall<T>, options?: O): Promise<JsonIf<O, T>> {
    return ro(tx, this.roOptions(options || {})) as Promise<JsonIf<O, T>>;
  }

  roOk<T, O extends ClientOptions>(
    tx: ContractCall<Response<T, any>>,
    options?: O
  ): Promise<JsonIf<O, T>> {
    return roOk(tx, this.roOptions(options || {})) as Promise<JsonIf<O, T>>;
  }

  roErr<T, O extends ClientOptions>(
    tx: ContractCall<Response<any, T>>,
    options?: O
  ): Promise<JsonIf<O, T>> {
    return roErr(tx, this.roOptions(options || {})) as Promise<JsonIf<O, T>>;
  }
}
