import { useMemo } from 'react';
import { createContractDocInfo, type ClaridocContract } from '@clarigen/docs';
import { parseContractAbi } from '@/lib/stacks-api';
import { useContractInfo } from '@/hooks/use-contract-abi';
import type { NETWORK } from '@/lib/constants';

export function useContractDocs(network: NETWORK, contractId: string) {
  const query = useContractInfo(network, contractId);
  const { docs, error } = useMemo(() => {
    if (!query.data) {
      return { docs: undefined, error: undefined };
    }
    if (!query.data.abi) {
      return { docs: undefined, error: new Error('Expected ABI') };
    }
    try {
      const docs = createContractDocInfo({
        contractSrc: query.data.source_code,
        abi: parseContractAbi(query.data.abi),
      });
      return { docs, error: undefined };
    } catch (err) {
      const parsedError =
        err instanceof Error ? err : new Error('Failed to parse contract docs');
      return { docs: undefined, error: parsedError };
    }
  }, [query.data]);

  return {
    ...query,
    data: docs as ClaridocContract | undefined,
    error: query.error ?? error,
  };
}
