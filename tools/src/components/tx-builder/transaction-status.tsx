import { StacksTransaction } from '@/types/stacks-transaction';
import { NETWORK } from '@/lib/constants';
import { format } from 'dnum';

interface TransactionStatusProps {
  tx: typeof StacksTransaction.infer;
  network: NETWORK;
}

function StatusIndicator({ status }: { status: string }) {
  if (status === 'pending') {
    return <span className="text-blue-500 animate-pulse">◌</span>;
  }
  if (status === 'success') {
    return <span className="text-green-600 dark:text-green-500">●</span>;
  }
  return <span className="text-destructive">×</span>;
}

function DataRow({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4 text-xs py-1.5 border-b border-border/50 last:border-0">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className={`text-right break-all ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
}

export function TransactionStatus({ tx, network }: TransactionStatusProps) {
  const isPending = tx.tx_status === 'pending';
  const isSuccess = tx.tx_status === 'success';

  return (
    <div className="border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2 text-sm font-medium font-mono">
          <StatusIndicator status={tx.tx_status} />
          <span>
            {isPending ? 'pending' : isSuccess ? 'confirmed' : 'failed'}
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          tx
        </span>
      </div>

      {/* Details */}
      <div className="px-4 py-3 space-y-0">
        <DataRow label="txid" value={tx.tx_id} mono />

        {'replaced_by_tx_id' in tx && tx.replaced_by_tx_id && (
          <DataRow label="replaced_by" value={tx.replaced_by_tx_id} mono />
        )}

        {'receipt_time_iso' in tx && (
          <DataRow label="received" value={new Date(tx.receipt_time_iso).toLocaleString()} />
        )}

        {'block_time_iso' in tx && (
          <DataRow label="confirmed" value={new Date(tx.block_time_iso).toLocaleString()} />
        )}

        {'block_height' in tx && (
          <DataRow label="block" value={tx.block_height.toLocaleString()} mono />
        )}
      </div>

      {/* Result */}
      {'block_height' in tx && tx.tx_result && (
        <div className="border-t border-border px-4 py-3 space-y-2">
          <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
            Result
          </div>
          <pre className="font-mono text-sm p-3 bg-muted/30 border border-border overflow-auto break-all">
            {tx.tx_result.repr}
          </pre>
        </div>
      )}

      {/* VM Error */}
      {'block_height' in tx && tx.vm_error && (
        <div className="border-t border-destructive/30 bg-destructive/5 px-4 py-3">
          <pre className="text-sm text-destructive font-mono break-all">
            {tx.vm_error}
          </pre>
        </div>
      )}

      {/* Events */}
      {'block_height' in tx && tx.events && tx.events.length > 0 && (
        <details className="border-t border-border group">
          <summary className="px-4 py-3 cursor-pointer hover:bg-muted/30 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              Events
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {tx.events.length}
            </span>
          </summary>
          <div className="px-4 pb-3 space-y-2">
            {tx.events.map((event, i) => (
              <div key={i} className="text-xs p-3 bg-muted/30 border border-border font-mono">
                <div className="text-[10px] uppercase text-muted-foreground mb-2">
                  {event.event_type.replace(/_/g, ' ')}
                </div>
                {event.event_type === 'smart_contract_log' && (
                  <div className="break-all">{event.contract_log.value.repr}</div>
                )}
                {event.event_type === 'stx_asset' && (
                  <div className="space-y-1">
                    <div>
                      {event.asset.asset_event_type} {format([BigInt(event.asset.amount), 6])} STX
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      <div>from: {event.asset.sender}</div>
                      <div>to: {event.asset.recipient}</div>
                    </div>
                  </div>
                )}
                {event.event_type === 'fungible_token_asset' && (
                  <div className="space-y-1">
                    <div>
                      {event.asset.asset_event_type} {event.asset.amount} {event.asset.asset_id}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      <div>from: {event.asset.sender}</div>
                      <div>to: {event.asset.recipient}</div>
                    </div>
                  </div>
                )}
                {event.event_type === 'non_fungible_token_asset' && (
                  <div className="space-y-1">
                    <div>
                      {event.asset.asset_event_type} {event.asset.asset_id} ({event.asset.value.repr})
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      <div>from: {event.asset.sender}</div>
                      <div>to: {event.asset.recipient}</div>
                    </div>
                  </div>
                )}
                {event.event_type === 'stx_lock' && (
                  <div className="space-y-1">
                    <div>
                      locked {format([BigInt(event.stx_lock_event.locked_amount), 6])} STX until block{' '}
                      {event.stx_lock_event.unlock_height}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      address: {event.stx_lock_event.locked_address}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Footer */}
      <div className="border-t border-border px-4 py-3 bg-muted/20">
        <a
          href={`https://explorer.hiro.so/txid/${tx.tx_id}?chain=${network}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-primary hover:underline font-mono"
        >
          → explorer
        </a>
      </div>
    </div>
  );
}
