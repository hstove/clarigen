import { StacksTransaction } from '@/types/stacks-transaction';
import { NETWORK } from '@/lib/constants';
import { TransactionStatus } from './transaction-status';
import { ExplorerLink } from './explorer-link';
import { FieldHelper } from './field-helper';

interface ContextPanelProps {
  txid: string | undefined;
  tx: typeof StacksTransaction.infer | null | undefined;
  txError: Error | null;
  network: NETWORK;
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

  // Builder mode: show field helper
  return <FieldHelper />;
}
