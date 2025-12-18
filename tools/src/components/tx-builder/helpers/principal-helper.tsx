import { Button } from '@/components/ui/button';
import type { FocusedField } from '@/hooks/use-focused-field';
import { useAccount } from '@/hooks/use-stacks';
import { UserCircle, FileCode } from 'lucide-react';
import { NETWORK } from '@/lib/constants';

interface PrincipalHelperProps {
  field: FocusedField;
  onApply: (value: string) => void;
  network: NETWORK;
  contractId: string;
}

export function PrincipalHelper({ field, onApply, network, contractId }: PrincipalHelperProps) {
  const { stacksAddress, stacksAddressTestnet, connect, stacksAccount } = useAccount();
  const isContract = field.type === 'trait_reference';

  // Use the appropriate address based on network
  const userAddress = network === 'mainnet' ? stacksAddress : stacksAddressTestnet;

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
        <p className="text-xs text-muted-foreground">
          {isContract ? 'Contract principal' : 'Stacks address'}
        </p>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Mainnet: starts with SP...</p>
          <p>• Testnet: starts with ST...</p>
          {isContract && <p>• Format: address.contract-name</p>}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium">Quick Fill</p>

        {!stacksAccount ? (
          <Button onClick={handleConnect} variant="secondary" size="sm" className="w-full">
            Connect Wallet
          </Button>
        ) : (
          <div className="space-y-2">
            <Button
              onClick={handleUseWalletAddress}
              variant="secondary"
              size="sm"
              className="w-full justify-start gap-2"
              disabled={!userAddress}
            >
              <UserCircle className="h-4 w-4" />
              <span className="flex-1 text-left">Your Address</span>
            </Button>
            {userAddress && (
              <p className="text-[10px] font-mono text-muted-foreground px-2 truncate">
                {userAddress}
              </p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Button
            onClick={handleUseContractAddress}
            variant="secondary"
            size="sm"
            className="w-full justify-start gap-2"
          >
            <FileCode className="h-4 w-4" />
            <span className="flex-1 text-left">Contract Address</span>
          </Button>
          <p className="text-[10px] font-mono text-muted-foreground px-2 truncate">{contractId}</p>
        </div>
      </div>

      <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border">
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
