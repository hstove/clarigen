import { StacksTransaction } from '@/types/stacks-transaction';
import { NETWORK } from '@/lib/constants';
import { format } from 'dnum';
import { ExplorerLink } from './explorer-link';
import { cvToString } from '@clarigen/core';
import { deserializeCV } from '@stacks/transactions';

interface TransactionStatusProps {
  tx: typeof StacksTransaction.infer;
  network: NETWORK;
}

const BLOCK_LIMIT_MAINNET_21 = {
  write_length: 15_000_000,
  write_count: 15_000,
  read_length: 100_000_000,
  read_count: 15_000,
  runtime: 5_000_000_000,
};

function StatusIndicator({ status }: { status: string }) {
  if (status === 'pending') {
    return <span className="text-blue-500 animate-pulse">◌</span>;
  }
  if (status === 'success') {
    return <span className="text-green-600 dark:text-green-500">●</span>;
  }
  return <span className="text-destructive">×</span>;
}

function DataRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 text-xs py-1.5 border-b border-border/50 last:border-0">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className={`text-right break-all min-w-0 max-w-[65%] ${mono ? 'font-mono' : ''}`}>
        {value}
      </span>
    </div>
  );
}

function formatPrincipal(principal: { type_id: string; address?: string; contract_name?: string }) {
  if (principal.type_id === 'principal_origin') {
    return 'origin';
  }
  if (principal.type_id === 'principal_contract') {
    return `${principal.address}.${principal.contract_name}`;
  }
  return principal.address ?? 'unknown';
}

function formatConditionCode(code: string) {
  switch (code) {
    case 'sent_equal_to':
      return 'sent =';
    case 'sent_greater_than':
      return 'sent >';
    case 'sent_greater_than_or_equal_to':
      return 'sent >=';
    case 'sent_less_than':
      return 'sent <';
    case 'sent_less_than_or_equal_to':
      return 'sent <=';
    case 'sent':
      return 'sent';
    case 'not_sent':
      return 'not sent';
    default:
      return code;
  }
}

function formatFungibleEventType(type: string) {
  switch (type) {
    case 'mint':
      return { symbol: '+', className: 'text-green-600 dark:text-green-500' };
    case 'burn':
      return { symbol: '-', className: 'text-destructive' };
    case 'transfer':
      return { symbol: '->', className: 'text-primary' };
    default:
      return { symbol: '?', className: 'text-muted-foreground' };
  }
}

function formatProgress(used: number, limit: number, barWidth = 14) {
  const formatCompact = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue >= 1_000_000_000) {
      const shortened = (value / 1_000_000_000).toFixed(1);
      return `${shortened.endsWith('.0') ? shortened.slice(0, -2) : shortened}b`;
    }
    if (absValue >= 1_000_000) {
      const shortened = (value / 1_000_000).toFixed(1);
      return `${shortened.endsWith('.0') ? shortened.slice(0, -2) : shortened}m`;
    }
    if (absValue >= 1_000) {
      const shortened = (value / 1_000).toFixed(1);
      return `${shortened.endsWith('.0') ? shortened.slice(0, -2) : shortened}k`;
    }
    return value.toLocaleString();
  };

  if (!Number.isFinite(used) || !Number.isFinite(limit) || limit <= 0) {
    return `${formatCompact(used)} / ${formatCompact(limit)}`;
  }
  const ratio = Math.min(Math.max(used / limit, 0), 1);
  const filled = Math.round(ratio * barWidth);
  const bar = `${'#'.repeat(filled)}${'.'.repeat(Math.max(barWidth - filled, 0))}`;
  return `${formatCompact(used)} / ${formatCompact(limit)} [${bar}] ${Math.round(ratio * 100)}%`;
}

export function TransactionStatus({ tx, network }: TransactionStatusProps) {
  const isPending = tx.tx_status === 'pending';
  const isSuccess = tx.tx_status === 'success';
  const showEventsInline = 'events' in tx && tx.events.length <= 3;
  const hasPostConditions = 'post_conditions' in tx && tx.post_conditions.length > 0;
  const hasExecutionCost =
    'execution_cost_read_count' in tx && typeof tx.execution_cost_read_count === 'number';

  return (
    <div className="border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2 text-sm font-medium font-mono">
          <StatusIndicator status={tx.tx_status} />
          <span>
            {isPending
              ? 'pending'
              : isSuccess
              ? 'confirmed'
              : tx.tx_status === 'abort_by_post_condition'
              ? 'post-condition failure'
              : 'failed'}
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          tx
        </span>
      </div>

      {/* Details */}
      <div className="px-4 py-3 space-y-0">
        <DataRow label="txid" value={tx.tx_id} mono />

        {'fee_rate' in tx && (
          <DataRow label="fee" value={`${format([BigInt(tx.fee_rate), 6])} STX`} />
        )}

        {'sponsored' in tx && tx.sponsored && (
          <DataRow
            label="sponsor"
            value={tx.sponsor_address ?? 'sponsored'}
            mono={!!tx.sponsor_address}
          />
        )}

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

      {/* Execution cost */}
      {hasExecutionCost && (
        <div className="border-t border-border px-4 py-3 space-y-0">
          <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
            Execution cost
          </div>
          <DataRow
            label="read count"
            value={formatProgress(tx.execution_cost_read_count, BLOCK_LIMIT_MAINNET_21.read_count)}
            mono
          />
          <DataRow
            label="read length"
            value={formatProgress(
              tx.execution_cost_read_length,
              BLOCK_LIMIT_MAINNET_21.read_length
            )}
            mono
          />
          <DataRow
            label="write count"
            value={formatProgress(
              tx.execution_cost_write_count,
              BLOCK_LIMIT_MAINNET_21.write_count
            )}
            mono
          />
          <DataRow
            label="write length"
            value={formatProgress(
              tx.execution_cost_write_length,
              BLOCK_LIMIT_MAINNET_21.write_length
            )}
            mono
          />
          <DataRow
            label="runtime"
            value={formatProgress(tx.execution_cost_runtime, BLOCK_LIMIT_MAINNET_21.runtime)}
            mono
          />
        </div>
      )}

      {/* Result */}
      {'block_height' in tx && tx.tx_result && (
        <div className="border-t border-border px-4 py-3 space-y-2">
          <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
            Result
          </div>
          <pre className="font-mono text-sm p-3 bg-muted/30 border border-border overflow-auto break-all whitespace-pre-wrap">
            {tx.tx_result.repr}
          </pre>
        </div>
      )}

      {/* Post-conditions */}
      {hasPostConditions && (
        <div className="border-t border-border px-4 py-3 space-y-2">
          <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
            Post-conditions ({tx.post_condition_mode})
          </div>
          <div className="space-y-2">
            {tx.post_conditions.map((condition, i) => {
              if (condition.type === 'stx') {
                return (
                  <div
                    key={`pc-${i}`}
                    className="text-xs p-3 bg-muted/30 border border-border font-mono break-all"
                  >
                    <div className="text-[10px] uppercase text-muted-foreground mb-2">stx</div>
                    <div className="break-all">
                      {formatPrincipal(condition.principal)}{' '}
                      {formatConditionCode(condition.condition_code)}{' '}
                      {format([BigInt(condition.amount), 6])} STX
                    </div>
                  </div>
                );
              }
              if (condition.type === 'fungible') {
                const assetId = `${condition.asset.contract_address}.${condition.asset.contract_name}::${condition.asset.asset_name}`;
                return (
                  <div
                    key={`pc-${i}`}
                    className="text-xs p-3 bg-muted/30 border border-border font-mono break-all"
                  >
                    <div className="text-[10px] uppercase text-muted-foreground mb-2">fungible</div>
                    <div className="break-all">
                      {formatPrincipal(condition.principal)}{' '}
                      {formatConditionCode(condition.condition_code)} {condition.amount} {assetId}
                    </div>
                  </div>
                );
              }
              const assetId = `${condition.asset.contract_address}.${condition.asset.contract_name}::${condition.asset.asset_name}`;
              return (
                <div
                  key={`pc-${i}`}
                  className="text-xs p-3 bg-muted/30 border border-border font-mono break-all"
                >
                  <div className="text-[10px] uppercase text-muted-foreground mb-2">
                    non-fungible
                  </div>
                  <div className="break-all">
                    {formatPrincipal(condition.principal)}{' '}
                    {formatConditionCode(condition.condition_code)} {assetId} (
                    {condition.asset_value.repr})
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VM Error */}
      {'block_height' in tx && tx.vm_error && (
        <div className="border-t border-destructive/30 bg-destructive/5 px-4 py-3">
          <pre className="text-sm text-destructive font-mono break-all whitespace-pre-wrap">
            {tx.vm_error}
          </pre>
        </div>
      )}

      {/* Events */}
      {'block_height' in tx && tx.events && tx.events.length > 0 && (
        <details className="border-t border-border group" open={showEventsInline}>
          <summary className="px-4 py-3 cursor-pointer hover:bg-muted/30 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              Events
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">{tx.events.length}</span>
          </summary>
          <div className="px-4 pb-3 space-y-2">
            {tx.events.map((event, i) => (
              <div
                key={i}
                className="text-xs p-3 bg-muted/30 border border-border font-mono break-all"
              >
                <div className="text-[10px] uppercase text-muted-foreground mb-2">
                  {event.event_type.replace(/_/g, ' ')}
                </div>
                {event.event_type === 'smart_contract_log' && (
                  <div className="break-all">
                    {cvToString(deserializeCV(event.contract_log.value.hex))}
                  </div>
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
                      <span
                        className={`inline-block min-w-[2ch] text-center font-mono ${
                          formatFungibleEventType(event.asset.asset_event_type).className
                        }`}
                      >
                        {formatFungibleEventType(event.asset.asset_event_type).symbol}
                      </span>
                      <span className="ml-2">
                        {event.asset.amount} {event.asset.asset_id}
                      </span>
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {event.asset.sender && <div>from: {event.asset.sender}</div>}
                      {event.asset.recipient && <div>to: {event.asset.recipient}</div>}
                    </div>
                  </div>
                )}
                {event.event_type === 'non_fungible_token_asset' && (
                  <div className="space-y-1">
                    <div>
                      {event.asset.asset_event_type} {event.asset.asset_id} (
                      {event.asset.value.repr})
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
                      locked {format([BigInt(event.stx_lock_event.locked_amount), 6])} STX until
                      block {event.stx_lock_event.unlock_height}
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
        <ExplorerLink txid={tx.tx_id} network={network} />
      </div>
    </div>
  );
}
