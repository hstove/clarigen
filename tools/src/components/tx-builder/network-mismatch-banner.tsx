import { Link } from '@tanstack/react-router';
import { AlertTriangleIcon } from 'lucide-react';
import { type NETWORK, isNetworkMismatch } from '@/lib/constants';
import { Button } from '@/components/ui/button';

type NetworkMismatchBannerProps = {
  network: NETWORK;
  contractId: string;
  functionName: string;
};

export function NetworkMismatchBanner({
  network,
  contractId,
  functionName,
}: NetworkMismatchBannerProps) {
  const { mismatch, detectedNetwork } = isNetworkMismatch(network, contractId);

  if (!(mismatch && detectedNetwork)) {
    return null;
  }

  const suggestedNetwork =
    detectedNetwork === 'mainnet' ? 'mainnet' : 'testnet';

  return (
    <div className="mb-6 border border-amber-500/50 bg-amber-500/10 px-4 py-3">
      <div className="flex items-start gap-3">
        <AlertTriangleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
        <div className="flex-1 space-y-2">
          <p className="font-mono text-sm">
            <span className="text-amber-600 dark:text-amber-400">
              network mismatch:
            </span>{' '}
            this address appears to be a{' '}
            <span className="font-medium">{detectedNetwork}</span> address, but
            you're on <span className="font-medium">{network}</span>.
          </p>
          <Link
            params={{
              network: suggestedNetwork,
              contractAddress: contractId,
              functionName,
            }}
            to="/tx/$network/$contractAddress/$functionName"
          >
            <Button className="h-7 text-xs" size="sm" variant="outline">
              switch to {suggestedNetwork}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
