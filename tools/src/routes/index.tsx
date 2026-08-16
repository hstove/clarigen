/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Cl } from '@stacks/transactions';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as Select from '@/components/ui/select';
import { useVisitedHistory } from '@/hooks/use-visited-history';
import {
  detectNetworkFromAddress,
  type NETWORK,
} from '@/lib/constants';

export const Route = createFileRoute('/')({ component: App });

const EXAMPLE_CONTRACTS = [
  {
    label: 'mainnet · token transfer',
    network: 'mainnet' as const,
    contractId: 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token-abtc',
    functionName: 'transfer',
  },
  {
    label: 'testnet · complex args',
    network: 'testnet' as const,
    contractId: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.tester',
    functionName: 'complex-args',
  },
] as const;

function App() {
  const { visitedFunctions, visitedContracts, clear } = useVisitedHistory();
  const groups = groupVisitedByContract(visitedFunctions);
  const hasHistory = visitedFunctions.length > 0;

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-6 py-12 sm:py-16">
      <section className="space-y-4 border-primary border-l-2 pl-5">
        <p className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">
          Stacks contract toolbox
        </p>
        <h1 className="max-w-2xl font-medium font-mono text-3xl tracking-tight sm:text-4xl">
          Build contract calls without the boilerplate.
        </h1>
        <p className="max-w-2xl text-muted-foreground text-sm leading-6">
          Open any deployed contract, inspect its public functions, and build a
          wallet-ready transaction from its ABI.
        </p>
      </section>

      <OpenContractForm />

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-medium font-mono text-sm tracking-tight">
              recent activity
            </h2>
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
              <h3 className="font-medium font-mono text-sm">No history yet</h3>
            </div>
            <div className="p-4 text-muted-foreground text-sm">
              Open a contract above to start building your history.
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function OpenContractForm() {
  const navigate = useNavigate();
  const [network, setNetwork] = useState<NETWORK>('mainnet');
  const [contractId, setContractId] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleContractIdChange(value: string) {
    setContractId(value);
    setError(null);
    const address = value.split('.')[0] ?? '';
    const detected = detectNetworkFromAddress(address);
    if (detected) setNetwork(detected);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmedContract = contractId.trim();
    const trimmedFunction = functionName.trim();

    if (!trimmedContract.includes('.')) {
      setError('use address.contract-name');
      return;
    }

    try {
      Cl.principal(trimmedContract);
    } catch {
      setError('invalid contract id');
      return;
    }

    if (trimmedFunction) {
      void navigate({
        to: '/tx/$network/$contractAddress/$functionName',
        params: {
          network,
          contractAddress: trimmedContract,
          functionName: trimmedFunction,
        },
      });
      return;
    }

    void navigate({
      to: '/tx/$network/$contractAddress',
      params: {
        network,
        contractAddress: trimmedContract,
      },
    });
  }

  return (
    <section className="border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-border border-b bg-muted/30 px-4 py-3">
        <h2 className="font-medium font-mono text-sm">open a contract</h2>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_CONTRACTS.map((example) => (
            <Link
              className="font-mono text-[10px] text-muted-foreground hover:text-primary hover:underline"
              key={example.label}
              params={{
                network: example.network,
                contractAddress: example.contractId,
                functionName: example.functionName,
              }}
              to="/tx/$network/$contractAddress/$functionName"
            >
              {example.label} ↗
            </Link>
          ))}
        </div>
      </div>
      <form className="space-y-4 p-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
          <div className="space-y-1.5">
            <Label className="font-mono text-xs" htmlFor="network">
              network
            </Label>
            <Select.Select
              onValueChange={(value) => {
                if (
                  value === 'mainnet' ||
                  value === 'testnet' ||
                  value === 'devnet'
                ) {
                  setNetwork(value);
                }
              }}
              value={network}
            >
              <Select.SelectTrigger className="w-full font-mono" id="network">
                <Select.SelectValue />
              </Select.SelectTrigger>
              <Select.SelectContent>
                <Select.SelectItem value="mainnet">mainnet</Select.SelectItem>
                <Select.SelectItem value="testnet">testnet</Select.SelectItem>
                <Select.SelectItem value="devnet">devnet</Select.SelectItem>
              </Select.SelectContent>
            </Select.Select>
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono text-xs" htmlFor="contract-id">
              contract id
            </Label>
            <Input
              className="font-mono"
              id="contract-id"
              onChange={(e) => handleContractIdChange(e.target.value)}
              placeholder="SP….contract-name"
              value={contractId}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="font-mono text-xs" htmlFor="function-name">
            function{' '}
            <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            className="font-mono"
            id="function-name"
            onChange={(e) => setFunctionName(e.target.value)}
            placeholder="leave blank to list functions"
            value={functionName}
          />
        </div>
        {error ? (
          <p className="font-mono text-destructive text-xs">× {error}</p>
        ) : null}
        <div className="flex flex-col items-start justify-between gap-3 border-border border-t pt-4 sm:flex-row sm:items-center">
          <p className="break-all font-mono text-[10px] text-muted-foreground">
            → /tx/{network}/{contractId.trim() || '{contract-id}'}
            {functionName.trim() ? `/${functionName.trim()}` : ''}
          </p>
          <Button size="sm" type="submit">
            open
          </Button>
        </div>
      </form>
    </section>
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
