import { useQuery } from '@tanstack/react-query';
import type { NETWORK } from '@/lib/constants';
import { getTransaction } from '@/lib/stacks-api';

export function useTransaction(network: NETWORK, txid: string | undefined) {
  return useQuery({
    queryKey: ['transaction', network, txid],
    // biome-ignore lint/suspicious/useAwait: ignored using `--suppress`
    queryFn: async () => {
      if (!txid) return null;
      return getTransaction(network, txid);
    },
    enabled: !!txid,
    refetchInterval: (query) => {
      const tx = query.state.data;
      if (!tx) return 5000;
      if (tx.tx_status === 'pending') return 3000;
      return false;
    },
  });
}
