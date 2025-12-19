import { Link } from '@tanstack/react-router';
import { ChevronRightIcon } from 'lucide-react';
import type { NETWORK } from '@/lib/constants';

type BreadcrumbsProps = {
  network: NETWORK;
  contractId: string;
  functionName?: string;
};

export function Breadcrumbs({
  network,
  contractId,
  functionName,
}: BreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 font-mono text-muted-foreground text-xs">
      <Link className="transition-colors hover:text-primary" to="/">
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
            className="break-all transition-colors hover:text-primary"
            params={{
              network,
              contractAddress: contractId,
            }}
            to="/tx/$network/$contractAddress"
          >
            {contractId}
          </Link>
          <ChevronRightIcon className="h-3 w-3 flex-shrink-0" />
          <span className="font-medium text-foreground">{functionName}</span>
        </>
      ) : (
        <span className="break-all font-medium text-foreground">
          {contractId}
        </span>
      )}
    </nav>
  );
}
