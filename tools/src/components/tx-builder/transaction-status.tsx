/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import type { StacksTransaction } from '@/types/stacks-transaction';
import type { NETWORK } from '@/lib/constants';
import { format } from 'dnum';
import { ExplorerLink } from './explorer-link';
import { cvToString } from '@clarigen/core';
import { deserializeCV } from '@stacks/transactions';
import { Hex } from 'viem'

type TransactionStatusProps = {
  tx: typeof StacksTransaction.infer;
  network: NETWORK;
};

const BLOCK_LIMIT_MAINNET_21 = {
  write_length: 15_000_000,
  write_count: 15_000,
  read_length: 100_000_000,
  read_count: 15_000,
  runtime: 5_000_000_000,
};

function StatusIndicator({ status }: { status: string }) {
  if (status === 'pending') {
    return <span className="animate-pulse text-blue-500">◌</span>;
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
    <div className="flex justify-between gap-4 border-border/50 border-b py-1.5 text-xs last:border-0">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span
        className={`min-w-0 max-w-[65%] break-all text-right ${mono ? 'font-mono' : ''}`}
      >
        {value}
      </span>
    </div>
  );
}

function formatPrincipal(principal: {
  type_id: string;
  address?: string;
  contract_name?: string;
}) {
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
    if (absValue >= 1000) {
      const shortened = (value / 1000).toFixed(1);
      return `${shortened.endsWith('.0') ? shortened.slice(0, -2) : shortened}k`;
    }
    return value.toLocaleString();
  };

  if (!(Number.isFinite(used) && Number.isFinite(limit)) || limit <= 0) {
    return `${formatCompact(used)} / ${formatCompact(limit)}`;
  }
  const ratio = Math.min(Math.max(used / limit, 0), 1);
  const filled = Math.round(ratio * barWidth);
  const bar = `${'#'.repeat(filled)}${'.'.repeat(Math.max(barWidth - filled, 0))}`;
  return `${formatCompact(used)} / ${formatCompact(limit)} [${bar}] ${Math.round(ratio * 100)}%`;
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: ignored using `--suppress`
export function TransactionStatus({ tx, network }: TransactionStatusProps) {
  const isPending = tx.tx_status === 'pending';
  const isSuccess = tx.tx_status === 'success';
  const showEventsInline = 'events' in tx && tx.events.length <= 3;
  const hasPostConditions =
    'post_conditions' in tx && tx.post_conditions.length > 0;
  const hasExecutionCost =
    'execution_cost_read_count' in tx &&
    typeof tx.execution_cost_read_count === 'number';

  return (
    <div className="border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-border border-b bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2 font-medium font-mono text-sm">
          <StatusIndicator status={tx.tx_status} />
          <span>
            {isPending
              ? 'pending'
              : // biome-ignore lint/style/noNestedTernary: ignored using `--suppress`
                isSuccess
                ? 'confirmed'
                : // biome-ignore lint/style/noNestedTernary: ignored using `--suppress`
                  tx.tx_status === 'abort_by_post_condition'
                  ? 'post-condition failure'
                  : 'failed'}
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
          tx
        </span>
      </div>

      {/* Details */}
      <div className="space-y-0 px-4 py-3">
        <DataRow label="txid" mono value={tx.tx_id} />

        {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
        {'fee_rate' in tx && (
          <DataRow
            label="fee"
            value={`${format([BigInt(tx.fee_rate), 6])} STX`}
          />
        )}

        {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
        {'sponsored' in tx && tx.sponsored && (
          <DataRow
            label="sponsor"
            mono={!!tx.sponsor_address}
            value={tx.sponsor_address ?? 'sponsored'}
          />
        )}

        {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
        {'replaced_by_tx_id' in tx && tx.replaced_by_tx_id && (
          <DataRow label="replaced_by" mono value={tx.replaced_by_tx_id} />
        )}

        {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
        {'receipt_time_iso' in tx && (
          <DataRow
            label="received"
            value={new Date(tx.receipt_time_iso).toLocaleString()}
          />
        )}

        {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
        {'block_time_iso' in tx && (
          <DataRow
            label="confirmed"
            value={new Date(tx.block_time_iso).toLocaleString()}
          />
        )}

        {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
        {'block_height' in tx && (
          <DataRow
            label="block"
            mono
            value={tx.block_height.toLocaleString()}
          />
        )}
      </div>

      {/* Execution cost */}
      {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
      {hasExecutionCost && (
        <div className="space-y-0 border-border border-t px-4 py-3">
          <div className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
            Execution cost
          </div>
          <DataRow
            label="read count"
            mono
            value={formatProgress(
              tx.execution_cost_read_count,
              BLOCK_LIMIT_MAINNET_21.read_count
            )}
          />
          <DataRow
            label="read length"
            mono
            value={formatProgress(
              tx.execution_cost_read_length,
              BLOCK_LIMIT_MAINNET_21.read_length
            )}
          />
          <DataRow
            label="write count"
            mono
            value={formatProgress(
              tx.execution_cost_write_count,
              BLOCK_LIMIT_MAINNET_21.write_count
            )}
          />
          <DataRow
            label="write length"
            mono
            value={formatProgress(
              tx.execution_cost_write_length,
              BLOCK_LIMIT_MAINNET_21.write_length
            )}
          />
          <DataRow
            label="runtime"
            mono
            value={formatProgress(
              tx.execution_cost_runtime,
              BLOCK_LIMIT_MAINNET_21.runtime
            )}
          />
        </div>
      )}

      {/* Result */}
      {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
      {'block_height' in tx && tx.tx_result && (
        <div className="space-y-2 border-border border-t px-4 py-3">
          <div className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
            Result
          </div>
          <pre className="overflow-auto whitespace-pre-wrap break-all border border-border bg-muted/30 p-3 font-mono text-sm">
            {tx.tx_result.repr}
          </pre>
        </div>
      )}

      {/* Post-conditions */}
      {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
      {hasPostConditions && (
        <div className="space-y-2 border-border border-t px-4 py-3">
          <div className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
            Post-conditions ({tx.post_condition_mode})
          </div>
          <div className="space-y-2">
            {tx.post_conditions.map((condition, i) => {
              if (condition.type === 'stx') {
                return (
                  <div
                    className="break-all border border-border bg-muted/30 p-3 font-mono text-xs"
                    key={`pc-${i}`}
                  >
                    <div className="mb-2 text-[10px] text-muted-foreground uppercase">
                      stx
                    </div>
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
                    className="break-all border border-border bg-muted/30 p-3 font-mono text-xs"
                    key={`pc-${i}`}
                  >
                    <div className="mb-2 text-[10px] text-muted-foreground uppercase">
                      fungible
                    </div>
                    <div className="break-all">
                      {formatPrincipal(condition.principal)}{' '}
                      {formatConditionCode(condition.condition_code)}{' '}
                      {condition.amount} {assetId}
                    </div>
                  </div>
                );
              }
              const assetId = `${condition.asset.contract_address}.${condition.asset.contract_name}::${condition.asset.asset_name}`;
              return (
                <div
                  className="break-all border border-border bg-muted/30 p-3 font-mono text-xs"
                  key={`pc-${i}`}
                >
                  <div className="mb-2 text-[10px] text-muted-foreground uppercase">
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
      {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
      {'block_height' in tx && tx.vm_error && (
        <div className="border-destructive/30 border-t bg-destructive/5 px-4 py-3">
          <pre className="whitespace-pre-wrap break-all font-mono text-destructive text-sm">
            {tx.vm_error}
          </pre>
        </div>
      )}

      {/* Events */}
      {'block_height' in tx && tx.events && tx.events.length > 0 && (
        <details
          className="group border-border border-t"
          open={showEventsInline}
        >
          <summary className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-muted/30">
            <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
              Events
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {tx.events.length}
            </span>
          </summary>
          <div className="space-y-2 px-4 pb-3">
            {tx.events.map((event, i) => (
              <div
                className="break-all border border-border bg-muted/30 p-3 font-mono text-xs"
                key={i}
              >
                <div className="mb-2 text-[10px] text-muted-foreground uppercase">
                  {event.event_type.replace(/_/g, ' ')}
                </div>
                {event.event_type === 'smart_contract_log' && (
                  <div className="whitespace-pre-wrap break-all">
                    {cvToString(deserializeCV(event.contract_log.value.hex), {
                      indent: 2,
                    })}
                  </div>
                )}
                {event.event_type === 'stx_asset' && (
                  <div className="space-y-1">
                    <div>
                      {event.asset.asset_event_type}{' '}
                      {format([BigInt(event.asset.amount), 6])} STX
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
                          formatFungibleEventType(event.asset.asset_event_type)
                            .className
                        }`}
                      >
                        {
                          formatFungibleEventType(event.asset.asset_event_type)
                            .symbol
                        }
                      </span>
                      <span className="ml-2">
                        {event.asset.amount} {event.asset.asset_id}
                      </span>
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
                      {event.asset.sender && (
                        <div>from: {event.asset.sender}</div>
                      )}
                      {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
                      {event.asset.recipient && (
                        <div>to: {event.asset.recipient}</div>
                      )}
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
                      locked{' '}
                      {format([BigInt(event.stx_lock_event.locked_amount), 6])}{' '}
                      STX until block {event.stx_lock_event.unlock_height}
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
      <div className="border-border border-t bg-muted/20 px-4 py-3">
        <ExplorerLink network={network} txid={tx.tx_id} />
      </div>
    </div>
  );
}
