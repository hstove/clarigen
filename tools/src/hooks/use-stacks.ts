import { connect as connectStacks, disconnect as disconnectStacks } from '@stacks/connect';
import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queries } from '@/lib/queries';
import {
  addressToString,
  AddressVersion,
  createAddress,
  StacksWireType,
} from '@stacks/transactions';

function useStacksAccount() {
  const { data: stacksAccount } = useQuery(queries.stacks.getAccount());

  const stacksAddressMainnet = stacksAccount?.addresses.stx[0].address;

  let stacksAddress = stacksAddressMainnet;
  let stacksAddressTestnet = stacksAddressMainnet;
  if (stacksAddressMainnet) {
    const address = createAddress(stacksAddressMainnet);
    const testnetVersion =
      address.version === AddressVersion.MainnetMultiSig
        ? AddressVersion.TestnetMultiSig
        : AddressVersion.TestnetSingleSig;
    stacksAddressTestnet = addressToString({
      hash160: address.hash160,
      version: testnetVersion,
      type: StacksWireType.Address,
    });
  }

  return {
    stacksAccount,
    stacksAddress,
    stacksAddressTestnet,
  };
}

export function useAccount() {
  const queryClient = useQueryClient();
  const { stacksAccount, stacksAddress, stacksAddressTestnet } = useStacksAccount();

  const connect = React.useCallback(async () => {
    await connectStacks();
    queryClient.invalidateQueries(queries.stacks.getAccount());
  }, [queryClient]);

  const disconnect = React.useCallback(() => {
    disconnectStacks();
    queryClient.invalidateQueries(queries.stacks.getAccount());
  }, [queryClient]);

  return {
    stacksAddress,
    stacksAddressTestnet,
    stacksAccount,
    connect,
    disconnect,
  };
}
