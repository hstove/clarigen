import type { StacksTransaction } from '@/types/stacks-transaction';
import type { NETWORK } from '@/lib/constants';
import { TransactionStatus } from './transaction-status';
import { ExplorerLink } from './explorer-link';
import { FieldHelper } from './field-helper';
import type { ClaridocFunction } from '@clarigen/docs';

type ContextPanelProps = {
  txid: string | undefined;
  tx: typeof StacksTransaction.infer | null | undefined;
  txError: Error | null;
  network: NETWORK;
  contractId: string;
  functionName: string;
  functionDoc?: ClaridocFunction;
};

function TxStatusLoading({
  txid,
  network,
}: {
  txid: string;
  network: NETWORK;
}) {
  return (
    <div className="animate-pulse space-y-2 border border-border bg-muted/30 p-4">
      <div className="flex items-center gap-2 font-medium text-sm">
        <span className="text-muted-foreground">◌</span>
        <span>Loading transaction...</span>
      </div>
      <p className="break-all font-mono text-muted-foreground text-xs">
        {txid}
      </p>
      <ExplorerLink network={network} txid={txid} />
    </div>
  );
}

function TxStatusError({ txid, network }: { txid: string; network: NETWORK }) {
  return (
    <div className="space-y-2 border border-destructive/30 bg-destructive/5 p-4">
      <div className="flex items-center gap-2 font-medium text-destructive text-sm">
        <span>×</span>
        <span>Transaction Status Unavailable</span>
      </div>
      <p className="break-all font-mono text-muted-foreground text-xs">
        {txid}
      </p>
      <ExplorerLink network={network} txid={txid} />
    </div>
  );
}

export function ContextPanel({
  txid,
  tx,
  txError,
  network,
  contractId,
  functionName,
  functionDoc,
}: ContextPanelProps) {
  // Result mode: show transaction status
  if (txid) {
    if (tx) {
      return <TransactionStatus network={network} tx={tx} />;
    }
    if (txError) {
      return <TxStatusError network={network} txid={txid} />;
    }
    return <TxStatusLoading network={network} txid={txid} />;
  }

  // Builder mode: show field helper
  return (
    <FieldHelper
      contractId={contractId}
      functionDoc={functionDoc}
      functionName={functionName}
      network={network}
    />
  );
}
