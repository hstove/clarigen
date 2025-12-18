import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useVisitedHistory } from '@/hooks/use-visited-history';

export const Route = createFileRoute('/')({ component: App });

function App() {
  const { visitedFunctions, visitedContracts, clear } = useVisitedHistory();

  const groups = groupVisitedByContract(visitedFunctions);
  const hasHistory = visitedFunctions.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-mono text-lg font-medium tracking-tight">Recently Viewed</h1>
          <p className="text-xs text-muted-foreground">
            {visitedContracts.length} contracts · {visitedFunctions.length} visits
          </p>
        </div>
        <Button variant="outline" size="xs" onClick={clear} disabled={!hasHistory}>
          clear history
        </Button>
      </div>

      {!hasHistory ? (
        <div className="border border-border bg-card">
          <div className="border-b border-border px-4 py-3 bg-muted/30">
            <h2 className="font-mono text-sm font-medium">No history yet</h2>
          </div>
          <div className="p-4 text-sm text-muted-foreground">
            Visit a contract or function page to build your history.
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {groups.map(group => (
            <div
              key={`${group.network}:${group.contractId}`}
              className="border border-border bg-card"
            >
              <div className="border-b border-border px-4 py-3 bg-muted/30">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Link
                      to="/tx/$network/$contractAddress"
                      params={{ network: group.network, contractAddress: group.contractId }}
                      className="font-mono text-sm font-medium text-primary hover:underline break-all"
                    >
                      {group.contractId}
                    </Link>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {group.network}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground">
                    {group.entries.length} {group.entries.length === 1 ? 'entry' : 'entries'}
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {group.entries.map(entry => (
                  <div
                    key={`${entry.contractId}:${entry.functionName ?? 'overview'}:${
                      entry.lastVisited
                    }`}
                    className="flex items-center justify-between gap-4 border border-border/60 bg-muted/10 px-3 py-2"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[10px] font-mono uppercase text-muted-foreground">
                        {entry.functionName ? 'function' : 'overview'}
                      </span>
                      {entry.functionName ? (
                        <Link
                          to="/tx/$network/$contractAddress/$functionName"
                          params={{
                            network: entry.network,
                            contractAddress: entry.contractId,
                            functionName: entry.functionName,
                          }}
                          className="font-mono text-sm text-primary hover:underline"
                        >
                          {entry.functionName}
                        </Link>
                      ) : (
                        <Link
                          to="/tx/$network/$contractAddress"
                          params={{ network: entry.network, contractAddress: entry.contractId }}
                          className="font-mono text-sm text-primary hover:underline"
                        >
                          contract overview
                        </Link>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {formatRelativeTime(entry.lastVisited)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type GroupedVisited = {
  contractId: string;
  network: string;
  entries: {
    contractId: string;
    functionName: string | null;
    network: string;
    lastVisited: number;
  }[];
};

function groupVisitedByContract(entries: GroupedVisited['entries']): GroupedVisited[] {
  const groups: GroupedVisited[] = [];
  const map = new Map<string, GroupedVisited>();

  for (const entry of entries) {
    const key = `${entry.network}:${entry.contractId}`;
    let group = map.get(key);
    if (!group) {
      group = { contractId: entry.contractId, network: entry.network, entries: [] };
      map.set(key, group);
      groups.push(group);
    }
    group.entries.push(entry);
  }

  return groups;
}

function formatRelativeTime(timestamp: number): string {
  const deltaMs = Date.now() - timestamp;
  const minutes = Math.round(deltaMs / 60000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  return `${days}d ago`;
}
