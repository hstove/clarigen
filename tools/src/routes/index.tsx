/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useVisitedHistory } from '@/hooks/use-visited-history';

export const Route = createFileRoute('/')({ component: App });

function App() {
  const { visitedFunctions, visitedContracts, clear } = useVisitedHistory();

  const groups = groupVisitedByContract(visitedFunctions);
  const hasHistory = visitedFunctions.length > 0;

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-10">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-medium font-mono text-lg tracking-tight">
            Recently Viewed
          </h1>
          <p className="text-muted-foreground text-xs">
            {visitedContracts.length} contracts · {visitedFunctions.length}{' '}
            visits
          </p>
        </div>
        <Button
          disabled={!hasHistory}
          onClick={clear}
          size="xs"
          variant="outline"
        >
          clear history
        </Button>
      </div>

      {hasHistory ? (
        <div className="grid gap-4">
          {groups.map((group) => (
            <div
              className="border border-border bg-card"
              key={`${group.network}:${group.contractId}`}
            >
              <div className="border-border border-b bg-muted/30 px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Link
                      className="break-all font-medium font-mono text-primary text-sm hover:underline"
                      params={{
                        network: group.network,
                        contractAddress: group.contractId,
                      }}
                      to="/tx/$network/$contractAddress"
                    >
                      {group.contractId}
                    </Link>
                    <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                      {group.network}
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    {group.entries.length}{' '}
                    {group.entries.length === 1 ? 'entry' : 'entries'}
                  </div>
                </div>
              </div>
              <div className="space-y-2 p-4">
                {group.entries.map((entry) => (
                  <div
                    className="flex items-center justify-between gap-4 border border-border/60 bg-muted/10 px-3 py-2"
                    key={`${entry.contractId}:${entry.functionName ?? 'overview'}:${
                      entry.lastVisited
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-[10px] text-muted-foreground uppercase">
                        {entry.functionName ? 'function' : 'overview'}
                      </span>
                      {entry.functionName ? (
                        <Link
                          className="font-mono text-primary text-sm hover:underline"
                          params={{
                            network: entry.network,
                            contractAddress: entry.contractId,
                            functionName: entry.functionName,
                          }}
                          to="/tx/$network/$contractAddress/$functionName"
                        >
                          {entry.functionName}
                        </Link>
                      ) : (
                        <Link
                          className="font-mono text-primary text-sm hover:underline"
                          params={{
                            network: entry.network,
                            contractAddress: entry.contractId,
                          }}
                          to="/tx/$network/$contractAddress"
                        >
                          contract overview
                        </Link>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {formatRelativeTime(entry.lastVisited)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-border bg-card">
          <div className="border-border border-b bg-muted/30 px-4 py-3">
            <h2 className="font-medium font-mono text-sm">No history yet</h2>
          </div>
          <div className="p-4 text-muted-foreground text-sm">
            Visit a contract or function page to build your history.
          </div>
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

function groupVisitedByContract(
  entries: GroupedVisited['entries']
): GroupedVisited[] {
  const groups: GroupedVisited[] = [];
  const map = new Map<string, GroupedVisited>();

  for (const entry of entries) {
    const key = `${entry.network}:${entry.contractId}`;
    let group = map.get(key);
    if (!group) {
      group = {
        contractId: entry.contractId,
        network: entry.network,
        entries: [],
      };
      map.set(key, group);
      groups.push(group);
    }
    group.entries.push(entry);
  }

  return groups;
}

function formatRelativeTime(timestamp: number): string {
  const deltaMs = Date.now() - timestamp;
  const minutes = Math.round(deltaMs / 60_000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  return `${days}d ago`;
}
