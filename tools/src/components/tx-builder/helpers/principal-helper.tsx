import { Button } from '@/components/ui/button';
import type { FocusedField } from '@/hooks/use-focused-field';
import { useAccount } from '@/hooks/use-stacks';
import { UserCircle, FileCode } from 'lucide-react';
import type { NETWORK } from '@/lib/constants';

type PrincipalHelperProps = {
  field: FocusedField;
  onApply: (value: string) => void;
  network: NETWORK;
  contractId: string;
};

export function PrincipalHelper({
  field,
  onApply,
  network,
  contractId,
}: PrincipalHelperProps) {
  const { stacksAddress, stacksAddressTestnet, connect, stacksAccount } =
    useAccount();
  const isContract = field.type === 'trait_reference';

  // Use the appropriate address based on network
  const userAddress =
    network === 'mainnet' ? stacksAddress : stacksAddressTestnet;

  const handleUseWalletAddress = () => {
    if (userAddress) {
      onApply(userAddress);
    }
  };

  const handleUseContractAddress = () => {
    onApply(contractId);
  };

  const handleConnect = async () => {
    await connect();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs">
          {isContract ? 'Contract principal' : 'Stacks address'}
        </p>
        <div className="space-y-1 text-muted-foreground text-xs">
          <p>• Mainnet: starts with SP...</p>
          <p>• Testnet: starts with ST...</p>
          {isContract && <p>• Format: address.contract-name</p>}
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-medium text-xs">Quick Fill</p>

        {stacksAccount ? (
          <div className="space-y-2">
            <Button
              className="w-full justify-start gap-2"
              disabled={!userAddress}
              onClick={handleUseWalletAddress}
              size="sm"
              variant="secondary"
            >
              <UserCircle className="h-4 w-4" />
              <span className="flex-1 text-left">Your Address</span>
            </Button>
            {userAddress && (
              <p className="truncate px-2 font-mono text-[10px] text-muted-foreground">
                {userAddress}
              </p>
            )}
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={handleConnect}
            size="sm"
            variant="secondary"
          >
            Connect Wallet
          </Button>
        )}

        <div className="space-y-2">
          <Button
            className="w-full justify-start gap-2"
            onClick={handleUseContractAddress}
            size="sm"
            variant="secondary"
          >
            <FileCode className="h-4 w-4" />
            <span className="flex-1 text-left">Contract Address</span>
          </Button>
          <p className="truncate px-2 font-mono text-[10px] text-muted-foreground">
            {contractId}
          </p>
        </div>
      </div>

      <div className="space-y-1 border-border border-t pt-2 text-muted-foreground text-xs">
        <p className="font-medium">Note:</p>
        <p>
          • Your address is automatically adjusted for{' '}
          {network === 'mainnet' ? 'mainnet' : 'testnet'}
        </p>
        {isContract && <p>• Contract address must include the contract name</p>}
      </div>
    </div>
  );
}
