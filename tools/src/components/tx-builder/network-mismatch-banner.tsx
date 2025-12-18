import { Link } from '@tanstack/react-router';
import { AlertTriangleIcon } from 'lucide-react';
import { NETWORK, isNetworkMismatch } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface NetworkMismatchBannerProps {
  network: NETWORK;
  contractId: string;
  functionName: string;
}

export function NetworkMismatchBanner({
  network,
  contractId,
  functionName,
}: NetworkMismatchBannerProps) {
  const { mismatch, detectedNetwork } = isNetworkMismatch(network, contractId);

  if (!mismatch || !detectedNetwork) {
    return null;
  }

  const suggestedNetwork = detectedNetwork === 'mainnet' ? 'mainnet' : 'testnet';

  return (
    <div className="border border-amber-500/50 bg-amber-500/10 px-4 py-3 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangleIcon className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <p className="text-sm font-mono">
            <span className="text-amber-600 dark:text-amber-400">network mismatch:</span> this
            address appears to be a <span className="font-medium">{detectedNetwork}</span> address,
            but you're on <span className="font-medium">{network}</span>.
          </p>
          <Link
            to="/tx/$network/$contractAddress/$functionName"
            params={{
              network: suggestedNetwork,
              contractAddress: contractId,
              functionName,
            }}
          >
            <Button variant="outline" size="sm" className="h-7 text-xs">
              switch to {suggestedNetwork}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
