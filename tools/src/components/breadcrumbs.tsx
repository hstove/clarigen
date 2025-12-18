import { Link } from '@tanstack/react-router';
import { ChevronRightIcon } from 'lucide-react';
import { NETWORK } from '@/lib/constants';

interface BreadcrumbsProps {
  network: NETWORK;
  contractId: string;
  functionName?: string;
}

export function Breadcrumbs({ network, contractId, functionName }: BreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted-foreground">
      <Link to="/" className="hover:text-primary transition-colors">
        Clarigen Tools
      </Link>
      <ChevronRightIcon className="h-3 w-3 flex-shrink-0" />
      <span className="border border-border bg-muted px-1.5 py-0.5 text-muted-foreground uppercase">
        {network}
      </span>
      <ChevronRightIcon className="h-3 w-3 flex-shrink-0" />
      {functionName ? (
        <>
          <Link
            to="/tx/$network/$contractAddress"
            params={{
              network,
              contractAddress: contractId,
            }}
            className="hover:text-primary transition-colors break-all"
          >
            {contractId}
          </Link>
          <ChevronRightIcon className="h-3 w-3 flex-shrink-0" />
          <span className="text-foreground font-medium">{functionName}</span>
        </>
      ) : (
        <span className="text-foreground font-medium break-all">{contractId}</span>
      )}
    </nav>
  );
}
