import { StacksTransaction } from '@/types/stacks-transaction';
import { NETWORK } from '@/lib/constants';
import { TransactionStatus } from './transaction-status';
import { ExplorerLink } from './explorer-link';

interface ContextPanelProps {
  txid: string | undefined;
  tx: typeof StacksTransaction.infer | null | undefined;
  txError: Error | null;
  network: NETWORK;
}

function FieldHelperPlaceholder() {
  return (
    <div className="border border-border bg-card h-full">
      <div className="border-b border-border px-4 py-3 bg-muted/30">
        <h3 className="font-mono text-sm font-medium text-muted-foreground">field helper</h3>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground font-mono">
          Focus a field to see contextual help.
        </p>
      </div>
    </div>
  );
}

function TxStatusLoading({ txid, network }: { txid: string; network: NETWORK }) {
  return (
    <div className="border border-border bg-muted/30 p-4 space-y-2 animate-pulse">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="text-muted-foreground">◌</span>
        <span>Loading transaction...</span>
      </div>
      <p className="text-xs font-mono break-all text-muted-foreground">{txid}</p>
      <ExplorerLink txid={txid} network={network} />
    </div>
  );
}

function TxStatusError({ txid, network }: { txid: string; network: NETWORK }) {
  return (
    <div className="border border-destructive/30 bg-destructive/5 p-4 space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-destructive">
        <span>×</span>
        <span>Transaction Status Unavailable</span>
      </div>
      <p className="text-xs font-mono break-all text-muted-foreground">{txid}</p>
      <ExplorerLink txid={txid} network={network} />
    </div>
  );
}

export function ContextPanel({ txid, tx, txError, network }: ContextPanelProps) {
  // Result mode: show transaction status
  if (txid) {
    if (tx) {
      return <TransactionStatus tx={tx} network={network} />;
    }
    if (txError) {
      return <TxStatusError txid={txid} network={network} />;
    }
    return <TxStatusLoading txid={txid} network={network} />;
  }

  // Builder mode: show field helper (placeholder for now)
  return <FieldHelperPlaceholder />;
}
