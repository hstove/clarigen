import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { NETWORK, Network } from '@/lib/constants';
import { type } from 'arktype';
import { useContractFunctions } from '@/hooks/use-contract-abi';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { addVisitedFunction } from '@/lib/visited-history';

function parseNetwork(network: string): NETWORK | null {
  const result = Network(network);
  if (result instanceof type.errors) return null;
  return result;
}

export const Route = createFileRoute('/tx/$network/$contractAddress/')({
  component: ContractOverviewPage,
});

function ContractOverviewPage() {
  const { network: networkParam, contractAddress } = Route.useParams();
  const network = parseNetwork(networkParam)!;

  return <ContractOverviewContent network={network} contractId={contractAddress} />;
}

type ContractOverviewContentProps = {
  network: NETWORK;
  contractId: string;
};

function ContractOverviewContent({ network, contractId }: ContractOverviewContentProps) {
  const { data: functions, isLoading, error } = useContractFunctions(network, contractId);

  useEffect(() => {
    addVisitedFunction(contractId, null, network);
  }, [contractId, network]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <p className="text-sm text-muted-foreground">Loading contract functions…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <p className="text-sm text-destructive">Failed to load contract data.</p>
      </div>
    );
  }

  if (!functions) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <p className="text-sm text-destructive">
          Contract not found or not accessible on this network.
        </p>
      </div>
    );
  }

  const publicFunctions = functions.filter(f => f.access === 'public');
  const readOnlyFunctions = functions.filter(f => f.access === 'read_only');

  return (
    <div className="mx-auto max-w-2xl px-6 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs network={network} contractId={contractId} />

      {/* Contract Header */}
      <div className="space-y-2">
        <h1 className="font-mono text-lg font-medium tracking-tight break-all">{contractId}</h1>
      </div>

      {/* Public Functions */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Public Functions
        </h2>
        <div className="grid gap-2">
          {publicFunctions.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No public functions found.</p>
          ) : (
            publicFunctions.map(func => (
              <Link
                key={func.name}
                to="/tx/$network/$contractAddress/$functionName"
                params={{
                  network,
                  contractAddress: contractId,
                  functionName: func.name,
                }}
                className="group flex items-center justify-between border border-border bg-card p-4 hover:border-primary/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="font-mono text-sm font-medium group-hover:text-primary transition-colors">
                    {func.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    {func.args.length} {func.args.length === 1 ? 'arg' : 'args'}
                  </div>
                </div>
                <div className="text-muted-foreground group-hover:text-primary transition-colors">
                  →
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Read-Only Functions */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Read-Only Functions
        </h2>
        <div className="grid gap-2">
          {readOnlyFunctions.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No read-only functions found.</p>
          ) : (
            readOnlyFunctions.map(func => (
              <Link
                key={func.name}
                to="/tx/$network/$contractAddress/$functionName"
                params={{
                  network,
                  contractAddress: contractId,
                  functionName: func.name,
                }}
                className="group flex items-center justify-between border border-border bg-card p-4 hover:border-primary/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="font-mono text-sm font-medium group-hover:text-primary transition-colors">
                    {func.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    {func.args.length} {func.args.length === 1 ? 'arg' : 'args'}
                  </div>
                </div>
                <div className="text-muted-foreground group-hover:text-primary transition-colors">
                  →
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
