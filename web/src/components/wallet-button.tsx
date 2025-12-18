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
      <Button size="sm" variant="outline" onClick={connect}>
        <Wallet className="size-3.5" data-icon="inline-start" />
        connect
      </Button>
    );
  }

  const label = truncateAddress(stacksAddress) ?? 'Connected';

  return (
    <div className="flex items-center gap-2 font-mono">
      <div className="flex items-center gap-2 border border-border bg-muted/50 px-2.5 py-1 text-xs">
        <span className="text-green-600 dark:text-green-500">●</span>
        <span className="text-muted-foreground">{label}</span>
      </div>
      <Button variant="ghost" size="xs" onClick={disconnect}>
        disconnect
      </Button>
    </div>
  );
};
