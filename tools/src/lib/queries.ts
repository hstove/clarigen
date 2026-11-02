import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { getStxBalance } from './stacks-api';
import type { NETWORK } from './constants';

export const queries = createQueryKeyStore({
  stacks: {
    getAccount: () => ({
      queryKey: ['getStacksAccount'],
      queryFn: async () => {
        if (typeof window === 'undefined') return null;
        const { getLocalStorage } = await import('@stacks/connect');
        return getLocalStorage();
      },
    }),
    getStxBalance: (network: NETWORK, address: string) => ({
      queryKey: [network, address],
      queryFn: async () => getStxBalance(network, address),
    }),
  },
});
