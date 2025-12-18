import { StacksTransaction } from '@/types/stacks-transaction';
import { NETWORK } from '@/lib/constants';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { format } from 'dnum';

interface TransactionStatusProps {
  tx: typeof StacksTransaction.infer;
  network: NETWORK;
}

export function TransactionStatus({ tx, network }: TransactionStatusProps) {
  const isPending = tx.tx_status === 'pending';
  const isSuccess = tx.tx_status === 'success';
  const isError = !isPending && !isSuccess;

  return (
    <div className="p-4 border rounded-lg space-y-4 bg-muted/30">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          {isPending && <Clock className="w-4 h-4 text-blue-500 animate-pulse" />}
          {isSuccess && <CheckCircle2 className="w-4 h-4 text-green-500" />}
          {isError && <XCircle className="w-4 h-4 text-destructive" />}
          Transaction {isPending ? 'Pending' : isSuccess ? 'Confirmed' : 'Failed'}
        </h3>
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          {tx.tx_status.replace(/_/g, ' ')}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">ID</span>
          <span className="font-mono break-all text-right ml-4">{tx.tx_id}</span>
        </div>
        {'replaced_by_tx_id' in tx && tx.replaced_by_tx_id && (
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Replaced By</span>
            <span className="font-mono break-all text-right ml-4">{tx.replaced_by_tx_id}</span>
          </div>
        )}
        {'receipt_time_iso' in tx && (
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Received</span>
            <span>{new Date(tx.receipt_time_iso).toLocaleString()}</span>
          </div>
        )}
        {'block_time_iso' in tx && (
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Confirmed</span>
            <span>{new Date(tx.block_time_iso).toLocaleString()}</span>
          </div>
        )}
        {'block_height' in tx && (
          <>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Block Height</span>
              <span className="font-mono">{tx.block_height}</span>
            </div>
            {tx.tx_result && (
              <div className="space-y-1 mt-2">
                <span className="text-[10px] text-muted-foreground font-medium uppercase">
                  Result
                </span>
                <div className="font-mono text-sm p-3 bg-background border rounded-md break-all shadow-sm">
                  {tx.tx_result.repr}
                </div>
              </div>
            )}
            {tx.vm_error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {tx.vm_error}
              </div>
            )}

            {tx.events && tx.events.length > 0 && (
              <div className="space-y-2 mt-4">
                <span className="text-[10px] text-muted-foreground font-medium uppercase">
                  Events ({tx.events.length})
                </span>
                <div className="space-y-2">
                  {tx.events.map((event, i) => (
                    <div key={i} className="text-xs p-2 bg-background border rounded shadow-sm">
                      <div className="font-semibold text-[10px] uppercase text-muted-foreground mb-1">
                        {event.event_type.replace(/_/g, ' ')}
                      </div>
                      {event.event_type === 'smart_contract_log' && (
                        <div className="font-mono">{event.contract_log.value.repr}</div>
                      )}
                      {event.event_type === 'stx_asset' && (
                        <div>
                          {event.asset.asset_event_type} {format([BigInt(event.asset.amount), 6])}{' '}
                          STX
                          <div className="text-[10px] text-muted-foreground mt-1">
                            From: {event.asset.sender}
                            <br />
                            To: {event.asset.recipient}
                          </div>
                        </div>
                      )}
                      {event.event_type === 'fungible_token_asset' && (
                        <div>
                          {event.asset.asset_event_type} {event.asset.amount} {event.asset.asset_id}
                          <div className="text-[10px] text-muted-foreground mt-1">
                            From: {event.asset.sender}
                            <br />
                            To: {event.asset.recipient}
                          </div>
                        </div>
                      )}
                      {event.event_type === 'non_fungible_token_asset' && (
                        <div>
                          {event.asset.asset_event_type} {event.asset.asset_id} (
                          {event.asset.value.repr})
                          <div className="text-[10px] text-muted-foreground mt-1">
                            From: {event.asset.sender}
                            <br />
                            To: {event.asset.recipient}
                          </div>
                        </div>
                      )}
                      {event.event_type === 'stx_lock' && (
                        <div>
                          Locked {format([BigInt(event.stx_lock_event.locked_amount), 6])} STX until
                          height {event.stx_lock_event.unlock_height}
                          <div className="text-[10px] text-muted-foreground mt-1">
                            Address: {event.stx_lock_event.locked_address}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <a
        href={`https://explorer.hiro.so/txid/${tx.tx_id}?chain=${network}`}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-blue-600 dark:text-blue-400 underline inline-block font-medium hover:text-blue-800 dark:hover:text-blue-300"
      >
        View on Explorer
      </a>
    </div>
  );
}
