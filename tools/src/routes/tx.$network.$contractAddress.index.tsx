import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import { type NETWORK, Network } from '@/lib/constants';
import { type } from 'arktype';
import { useContractFunctions } from '@/hooks/use-contract-abi';
import { useContractDocs } from '@/hooks/use-contract-docs';
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

  return (
    <ContractOverviewContent contractId={contractAddress} network={network} />
  );
}

type ContractOverviewContentProps = {
  network: NETWORK;
  contractId: string;
};

function ContractOverviewContent({
  network,
  contractId,
}: ContractOverviewContentProps) {
  const {
    data: functions,
    isLoading,
    error,
  } = useContractFunctions(network, contractId);
  const { data: contractDocs } = useContractDocs(network, contractId);
  const functionDescriptions = useMemo(() => {
    if (!contractDocs) return new Map<string, string>();
    return new Map(
      contractDocs.functions.map((fn) => {
        const description = fn.comments.text
          .map((line) => line.trim())
          .filter(Boolean)
          .join(' ');
        return [fn.abi.name, description];
      })
    );
  }, [contractDocs]);

  useEffect(() => {
    addVisitedFunction(contractId, null, network);
  }, [contractId, network]);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-2xl p-6">
        <p className="text-muted-foreground text-sm">
          Loading contract functions…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-2xl p-6">
        <p className="text-destructive text-sm">
          Failed to load contract data.
        </p>
      </div>
    );
  }

  if (!functions) {
    return (
      <div className="container mx-auto max-w-2xl p-6">
        <p className="text-destructive text-sm">
          Contract not found or not accessible on this network.
        </p>
      </div>
    );
  }

  const publicFunctions = functions.filter((f) => f.access === 'public');
  const readOnlyFunctions = functions.filter((f) => f.access === 'read_only');

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-6 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs contractId={contractId} network={network} />

      {/* Contract Header */}
      <div className="space-y-2">
        <h1 className="break-all font-medium font-mono text-lg tracking-tight">
          {contractId}
        </h1>
      </div>

      {/* Public Functions */}
      <div className="space-y-4">
        <h2 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">
          Public Functions
        </h2>
        <div className="grid gap-2">
          {publicFunctions.length === 0 ? (
            <p className="text-muted-foreground text-sm italic">
              No public functions found.
            </p>
          ) : (
            publicFunctions.map((func) => (
              <Link
                className="group flex items-center justify-between border border-border bg-card p-4 transition-colors hover:border-primary/50"
                key={func.name}
                params={{
                  network,
                  contractAddress: contractId,
                  functionName: func.name,
                }}
                to="/tx/$network/$contractAddress/$functionName"
              >
                <div className="space-y-1">
                  <div className="font-medium font-mono text-sm transition-colors group-hover:text-primary">
                    {func.name}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    {func.args.length} {func.args.length === 1 ? 'arg' : 'args'}
                  </div>
                  {functionDescriptions.get(func.name) ? (
                    <div className="line-clamp-2 text-muted-foreground text-xs leading-relaxed">
                      {functionDescriptions.get(func.name)}
                    </div>
                  ) : null}
                </div>
                <div className="text-muted-foreground transition-colors group-hover:text-primary">
                  →
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Read-Only Functions */}
      <div className="space-y-4">
        <h2 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">
          Read-Only Functions
        </h2>
        <div className="grid gap-2">
          {readOnlyFunctions.length === 0 ? (
            <p className="text-muted-foreground text-sm italic">
              No read-only functions found.
            </p>
          ) : (
            readOnlyFunctions.map((func) => (
              <Link
                className="group flex items-center justify-between border border-border bg-card p-4 transition-colors hover:border-primary/50"
                key={func.name}
                params={{
                  network,
                  contractAddress: contractId,
                  functionName: func.name,
                }}
                to="/tx/$network/$contractAddress/$functionName"
              >
                <div className="space-y-1">
                  <div className="font-medium font-mono text-sm transition-colors group-hover:text-primary">
                    {func.name}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    {func.args.length} {func.args.length === 1 ? 'arg' : 'args'}
                  </div>
                  {functionDescriptions.get(func.name) ? (
                    <div className="line-clamp-2 text-muted-foreground text-xs leading-relaxed">
                      {functionDescriptions.get(func.name)}
                    </div>
                  ) : null}
                </div>
                <div className="text-muted-foreground transition-colors group-hover:text-primary">
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
