import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getContractInfo, parseContractAbi } from '@/lib/stacks-api';
import type { NETWORK } from '@/lib/constants';
import type { ClarityAbi } from '@clarigen/core';

export function useContractInfo(network: NETWORK, contractId: string) {
  return useQuery({
    queryKey: ['contractInfo', network, contractId],
    queryFn: () => getContractInfo(network, contractId),
  });
}

export function useContractAbi(network: NETWORK, contractId: string) {
  const query = useContractInfo(network, contractId);
  const { abi, error } = useMemo(() => {
    if (!query.data) {
      return { abi: undefined, error: undefined };
    }
    if (!query.data.abi) {
      return { abi: undefined, error: new Error('Expected ABI') };
    }
    try {
      return { abi: parseContractAbi(query.data.abi), error: undefined };
    } catch (err) {
      const parsedError =
        err instanceof Error ? err : new Error('Failed to parse ABI');
      return { abi: undefined, error: parsedError };
    }
  }, [query.data]);

  return {
    ...query,
    data: abi as ClarityAbi | undefined,
    error: query.error ?? error,
  };
}

export function useContractFunction(
  network: NETWORK,
  contractId: string,
  functionName: string
) {
  const query = useContractAbi(network, contractId);

  const func = query.data?.functions.find(
    (f) => f.name === functionName && f.access !== 'private'
  );

  return {
    ...query,
    data: func,
  };
}

export function useContractFunctions(network: NETWORK, contractId: string) {
  const query = useContractAbi(network, contractId);

  const functions = query.data?.functions.filter((f) => f.access !== 'private');

  return {
    ...query,
    data: functions,
  };
}
