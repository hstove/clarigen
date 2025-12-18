import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { getLocalStorage } from '@stacks/connect';
import { getStxBalance } from './stacks-api';
import { NETWORK } from './constants';

export const queries = createQueryKeyStore({
  stacks: {
    getAccount: () => ({
      queryKey: ['getStacksAccount'],
      queryFn: () => getLocalStorage(),
    }),
    getStxBalance: (network: NETWORK, address: string) => ({
      queryKey: [network, address],
      queryFn: async () => {
        return getStxBalance(network, address);
      },
    }),
  },
});
