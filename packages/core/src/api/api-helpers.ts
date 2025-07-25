import { SmartContractsApi, Configuration, TransactionsApi } from '@stacks/blockchain-api-client';
import { isNumber } from '../utils';

export function getHeaders(apiKey?: string) {
  const headers: Record<string, string> = {};
  if (apiKey) {
    headers['x-api-key'] = apiKey;
  }
  return headers;
}

export function smartContractsApi(url: string, apiKey?: string) {
  // const headers = apiKey ? { 'x-api-key': apiKey } : {};
  const headers = getHeaders(apiKey);
  return new SmartContractsApi(
    new Configuration({
      basePath: url,
      headers,
    })
  );
}

export function transactionsApi(url: string, apiKey?: string) {
  return new TransactionsApi(
    new Configuration({
      basePath: url,
      headers: getHeaders(apiKey),
    })
  );
}

const isClientSide = typeof window !== 'undefined';

const DEFAULT_FETCH_OPTIONS: RequestInit = isClientSide
  ? {
      referrer: 'no-referrer',
      referrerPolicy: 'no-referrer',
    }
  : {};

export async function fetchPrivate(input: RequestInfo, init: RequestInit = {}): Promise<Response> {
  return fetch(input, { ...DEFAULT_FETCH_OPTIONS, ...init });
}

export function v2Endpoint(url: string) {
  return `${url}/v2`;
}

export const generateUrl = (
  baseUrl: string,
  params: { [key: string]: string[] | string | number | boolean | undefined }
): string => {
  try {
    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (!value) return;
      if (Array.isArray(value)) {
        if (value.length === 0) return;
        return url.searchParams.set(`${key}[]`, generateQueryStringFromArray<string>(key, value));
      }
      if (typeof value == 'boolean' || isNumber(value)) {
        return url.searchParams.set(key, String(value));
      } else {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  } catch (e) {
    console.error('generateUrl');
    console.error(e);
    return baseUrl;
  }
};

export const generateQueryStringFromArray = <T>(key: string, values?: T[]) => {
  if (values?.length) {
    return `${values
      .map(
        (value, index) =>
          `${index > 0 ? encodeURIComponent(`${key}[]`) : ''}=${encodeURIComponent(
            value as unknown as string
          )}`
      )
      .join('&')}`;
  }
  return '';
};
