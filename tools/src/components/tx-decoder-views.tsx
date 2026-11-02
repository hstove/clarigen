import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { cvToString, getTypeString } from '@clarigen/core';
import type { ClarityValue, PostCondition } from '@stacks/transactions';
import { ClarityValueView } from '@/components/clarity-value-view';
import { CopyButton } from '@/components/copy-button';
import { useContractFunction } from '@/hooks/use-contract-abi';
import { detectNetworkFromAddress } from '@/lib/constants';
import {
  type CallRequest,
  type ContractCallInfo,
  callRequestWarnings,
  type DecodedItem,
  type DecodedTransaction,
  payloadWarnings,
  decodeTransaction,
  type Spender,
  type TxNetwork,
  type TxPayload,
  transactionWarnings,
  type Warning,
} from '@/lib/tx-decode';
import { hexToBytes } from '@/lib/hex';
import { lookupRawTransaction } from '@/lib/tx-lookup';
import { cn } from '@/lib/utils';
import { groupDigits, scaleAmount } from '@/lib/value-hints';

const STX_DECIMALS = 6;

function Panel({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-border border-b bg-muted/30 px-4 py-3">
        <h3 className="font-medium font-mono text-sm">{title}</h3>
        {aside}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function Fields({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[10rem_1fr]">
      {rows.map(([label, value]) => (
        <div className="contents" key={label}>
          <dt className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider sm:pt-0.5">
            {label}
          </dt>
          <dd className="break-all font-mono text-xs">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

const WARNING_STYLES: Record<Warning['level'], string> = {
  danger: 'border-destructive/50 bg-destructive/10 text-destructive',
  warn: 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-400',
  info: 'border-border bg-muted/30 text-muted-foreground',
};

function Warnings({ warnings }: { warnings: Warning[] }) {
  if (warnings.length === 0) return null;
  return (
    <ul className="space-y-2">
      {warnings.map((warning) => (
        <li
          className={cn(
            'border px-3 py-2 font-mono text-xs',
            WARNING_STYLES[warning.level]
          )}
          key={warning.message}
        >
          {warning.level === 'info' ? 'i' : '!'} {warning.message}
        </li>
      ))}
    </ul>
  );
}

function formatStx(amount: bigint | string | number): string {
  return `${scaleAmount(BigInt(amount), STX_DECIMALS)} STX`;
}

const COMPARATORS: Record<string, string> = {
  eq: 'exactly',
  gt: 'more than',
  gte: 'at least',
  lt: 'less than',
  lte: 'at most',
};

const NFT_CONDITIONS: Record<string, string> = {
  sent: 'sends',
  'not-sent': 'does not send',
  'maybe-sent': 'may send',
};

export function describePostCondition(pc: PostCondition): string {
  const who = pc.address === 'origin' ? 'tx sender (origin)' : pc.address;
  if (pc.type === 'stx-postcondition') {
    return `${who} sends ${COMPARATORS[pc.condition]} ${formatStx(pc.amount)}`;
  }
  if (pc.type === 'ft-postcondition') {
    return `${who} sends ${COMPARATORS[pc.condition]} ${groupDigits(BigInt(pc.amount))} ${pc.asset}`;
  }
  return `${who} ${NFT_CONDITIONS[pc.condition]} ${pc.asset} ${cvToString(pc.assetId)}`;
}

function PostConditionList({
  postConditions,
}: {
  postConditions: PostCondition[];
}) {
  if (postConditions.length === 0) {
    return <p className="font-mono text-muted-foreground text-xs">none</p>;
  }
  return (
    <ol className="space-y-2">
      {postConditions.map((pc, index) => (
        <li
          className="flex gap-3 border border-border/60 bg-muted/10 px-3 py-2 font-mono text-xs"
          key={`${index}:${describePostCondition(pc)}`}
        >
          <span className="text-muted-foreground">{index}</span>
          <span className="break-all">{describePostCondition(pc)}</span>
        </li>
      ))}
    </ol>
  );
}

function PostConditionsPanel({
  mode,
  postConditions,
}: {
  mode: string | null;
  postConditions: PostCondition[];
}) {
  return (
    <Panel
      aside={
        mode ? (
          <span
            className={cn(
              'font-mono text-[10px] uppercase tracking-wider',
              mode === 'allow' ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            mode: {mode}
          </span>
        ) : null
      }
      title={`post-conditions (${postConditions.length})`}
    >
      <PostConditionList postConditions={postConditions} />
    </Panel>
  );
}

function ArgsList({
  call,
  network,
}: {
  call: ContractCallInfo;
  network: TxNetwork | null;
}) {
  const abi = useContractFunction(
    network ?? 'mainnet',
    call.contractId,
    call.functionName
  );
  const abiArgs = network ? abi.data?.args : undefined;
  const countMismatch =
    abiArgs !== undefined && abiArgs.length !== call.args.length;

  return (
    <div className="space-y-4">
      {countMismatch ? (
        <Warnings
          warnings={[
            {
              level: 'danger',
              message: `function expects ${abiArgs.length} args, transaction has ${call.args.length}`,
            },
          ]}
        />
      ) : null}
      {call.args.length === 0 ? (
        <p className="font-mono text-muted-foreground text-xs">no arguments</p>
      ) : null}
      {call.args.map((arg, index) => {
        const abiArg = abiArgs?.[index];
        return (
          <ArgRow
            index={index}
            key={`${index}:${cvToString(arg)}`}
            name={abiArg?.name}
            typeString={abiArg ? getTypeString(abiArg.type) : undefined}
            value={arg}
          />
        );
      })}
      {network && abi.isError ? (
        <p className="font-mono text-[10px] text-muted-foreground">
          couldn't load the contract ABI for arg names
        </p>
      ) : null}
    </div>
  );
}

function ArgRow({
  index,
  name,
  typeString,
  value,
}: {
  index: number;
  name?: string;
  typeString?: string;
  value: ClarityValue;
}) {
  return (
    <div className="space-y-2 border-border border-l-2 pl-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-2 font-mono text-xs">
          <span className="text-muted-foreground">{index}</span>
          <span className="font-medium">{name ?? `arg ${index}`}</span>
          {typeString ? (
            <span className="text-[10px] text-muted-foreground">
              {typeString}
            </span>
          ) : null}
        </div>
        <CopyButton text={cvToString(value)} />
      </div>
      <ClarityValueView value={value} />
    </div>
  );
}

function ContractCallPanel({
  call,
  network,
}: {
  call: ContractCallInfo;
  network: TxNetwork | null;
}) {
  return (
    <Panel
      aside={
        network ? (
          <Link
            className="font-mono text-[10px] text-muted-foreground hover:text-primary hover:underline"
            params={{
              network,
              contractAddress: call.contractId,
              functionName: call.functionName,
            }}
            to="/tx/$network/$contractAddress/$functionName"
          >
            open in tx builder ↗
          </Link>
        ) : null
      }
      title="contract call"
    >
      <div className="space-y-5">
        <Fields
          rows={[
            ['contract', call.contractId],
            ['function', call.functionName],
          ]}
        />
        <ArgsList call={call} network={network} />
      </div>
    </Panel>
  );
}

function PayloadPanel({
  payload,
  network,
}: {
  payload: TxPayload;
  network: TxNetwork | null;
}) {
  switch (payload.kind) {
    case 'contract-call':
      return <ContractCallPanel call={payload} network={network} />;
    case 'token-transfer':
      return (
        <Panel title="stx transfer">
          <Fields
            rows={[
              ['recipient', payload.recipient],
              [
                'amount',
                `${formatStx(payload.amount)} (${groupDigits(payload.amount)} µSTX)`,
              ],
              ['memo', payload.memo ? `"${payload.memo}"` : '—'],
            ]}
          />
        </Panel>
      );
    case 'smart-contract':
      return (
        <Panel
          aside={<CopyButton text={payload.code} />}
          title={`deploy ${payload.contractName}`}
        >
          <div className="space-y-3">
            {payload.clarityVersion === null ? null : (
              <Fields
                rows={[['clarity version', String(payload.clarityVersion)]]}
              />
            )}
            <pre className="max-h-96 overflow-auto bg-muted/20 p-3 font-mono text-xs leading-5">
              {payload.code}
            </pre>
          </div>
        </Panel>
      );
    default:
      return (
        <Panel title="payload">
          <p className="font-mono text-xs">{payload.label}</p>
        </Panel>
      );
  }
}

function spenderRows(prefix: string, spender: Spender): [string, ReactNode][] {
  const status = spender.signed ? 'signed' : 'unsigned';
  const signatures =
    spender.signaturesRequired > 1
      ? `${spender.signatures}/${spender.signaturesRequired} sigs`
      : status;
  return [
    [`${prefix} address`, spender.address],
    [`${prefix} nonce`, spender.nonce.toString()],
    [
      `${prefix} fee`,
      `${formatStx(spender.fee)} (${groupDigits(spender.fee)} µSTX)`,
    ],
    [`${prefix} auth`, `${spender.hashMode} · ${signatures}`],
  ];
}

export function TransactionView({ tx }: { tx: DecodedTransaction }) {
  const rows: [string, ReactNode][] = [
    ['network', `${tx.network} (chain id ${tx.chainId})`],
    ...spenderRows('sender', tx.origin),
    ...(tx.sponsor ? spenderRows('sponsor', tx.sponsor) : []),
    ['size', `${tx.byteLength} bytes`],
  ];
  if (tx.origin.signed) rows.push(['txid', tx.txid]);

  return (
    <div className="space-y-4">
      <Warnings warnings={transactionWarnings(tx)} />
      <Panel title="transaction">
        <Fields rows={rows} />
      </Panel>
      <PayloadPanel network={tx.network} payload={tx.payload} />
      <PostConditionsPanel
        mode={tx.postConditionMode}
        postConditions={tx.postConditions}
      />
    </div>
  );
}

function CallRequestView({ request }: { request: CallRequest }) {
  const network =
    request.network ??
    detectNetworkFromAddress(request.call.contractId.split('.')[0] ?? '');
  return (
    <div className="space-y-4">
      <Warnings warnings={callRequestWarnings(request)} />
      <ContractCallPanel call={request.call} network={network} />
      <PostConditionsPanel
        mode={request.postConditionMode}
        postConditions={request.postConditions}
      />
    </div>
  );
}

function TxidView({ txid }: { txid: string }) {
  const query = useQuery({
    queryKey: ['rawTransaction', txid],
    queryFn: async () => {
      const { rawTx } = await lookupRawTransaction(txid, 'mainnet');
      return decodeTransaction(hexToBytes(rawTx));
    },
  });

  if (query.isPending) {
    return (
      <Panel title="txid">
        <p className="font-mono text-muted-foreground text-xs">
          fetching {txid}…
        </p>
      </Panel>
    );
  }
  if (query.isError) {
    return (
      <Panel title="txid">
        <p className="font-mono text-destructive text-xs">
          × {query.error.message}
        </p>
      </Panel>
    );
  }
  return <TransactionView tx={query.data} />;
}

export function DecodedItemView({ item }: { item: DecodedItem }) {
  switch (item.kind) {
    case 'transaction':
      return <TransactionView tx={item.tx} />;
    case 'call-request':
      return <CallRequestView request={item.request} />;
    case 'payload':
      return (
        <div className="space-y-4">
          <Warnings warnings={payloadWarnings(item.payload, item.network)} />
          <PayloadPanel network={item.network} payload={item.payload} />
        </div>
      );
    case 'txid':
      return <TxidView txid={item.txid} />;
    case 'clarity':
      return (
        <Panel
          aside={<CopyButton text={cvToString(item.value)} />}
          title="clarity value"
        >
          <div className="space-y-3">
            <ClarityValueView value={item.value} />
            <pre className="overflow-x-auto whitespace-pre-wrap break-all border-border border-t pt-3 font-mono text-xs leading-6">
              {cvToString(item.value, { indent: 2 })}
            </pre>
          </div>
        </Panel>
      );
    case 'post-condition':
      return (
        <Panel title="post-condition">
          <PostConditionList postConditions={[item.postCondition]} />
        </Panel>
      );
    case 'post-conditions':
      return (
        <PostConditionsPanel mode={null} postConditions={item.postConditions} />
      );
    default:
      return null;
  }
}
