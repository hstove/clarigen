import { useQuery } from '@tanstack/react-query';
import { getContractAbi } from '@/lib/stacks-api';
import type { NETWORK } from '@/lib/constants';

export function useContractAbi(network: NETWORK, contractId: string) {
  return useQuery({
    queryKey: ['contractAbi', network, contractId],
    queryFn: () => getContractAbi(network, contractId),
  });
}

export function useContractFunction(network: NETWORK, contractId: string, functionName: string) {
  const query = useContractAbi(network, contractId);

  const func = query.data?.functions.find(f => f.name === functionName && f.access !== 'private');

  return {
    ...query,
    data: func,
  };
}

export function useContractFunctions(network: NETWORK, contractId: string) {
  const query = useContractAbi(network, contractId);

  const functions = query.data?.functions.filter(f => f.access !== 'private');

  return {
    ...query,
    data: functions,
  };
}
