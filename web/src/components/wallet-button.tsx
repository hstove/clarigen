import { Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAccount } from '@/hooks/use-stacks';

const truncateAddress = (address?: string) => {
  if (!address) return undefined;

  return `${address.slice(0, 6)}…${address.slice(-4)}`;
};

export const WalletButton = () => {
  const { stacksAddress, connect, disconnect } = useAccount();

  if (!stacksAddress) {
    return (
      <Button size="sm" onClick={connect} data-icon="inline-start">
        <Wallet className="size-4" />
        Connect Wallet
      </Button>
    );
  }

  const label = truncateAddress(stacksAddress) ?? 'Connected';

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium">
        <Wallet className="size-4" />
        <span>{label}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={disconnect}
        // className="border-white/30 text-white hover:bg-white/10 hover:text-white"
      >
        Disconnect
      </Button>
    </div>
  );
};
