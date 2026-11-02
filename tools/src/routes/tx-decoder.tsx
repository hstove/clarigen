import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronRightIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';
import { DecodedItemView } from '@/components/tx-decoder-views';
import { Label } from '@/components/ui/label';
import * as Select from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TX_DECODER_EXAMPLES } from '@/lib/decoder-examples';
import { DECODE_MODES, type DecodedItem, decodeInput } from '@/lib/tx-decode';

export const Route = createFileRoute('/tx-decoder')({
  component: TxDecoderPage,
});

const NEWLINES = /\s*\n\s*/g;
const MODE_VALUES = DECODE_MODES.map(mode => mode.value);

const ITEM_LABELS: Record<DecodedItem['kind'], string> = {
  transaction: 'transaction',
  payload: 'transaction payload',
  'call-request': 'contract call request',
  clarity: 'clarity value',
  'post-condition': 'post-condition',
  'post-conditions': 'post-condition list',
  txid: 'txid',
};

function TxDecoderPage() {
  const [urlInput, setUrlInput] = useQueryState('input', parseAsString.withDefault(''));
  // The router drops newlines from the URL, so the textarea keeps its own copy
  const [input, setInputState] = useState(urlInput);
  const setInput = (value: string) => {
    setInputState(value);
    setUrlInput(value.replace(NEWLINES, ' '));
  };
  const [mode, setMode] = useQueryState(
    'as',
    parseAsStringLiteral(MODE_VALUES).withDefault('auto')
  );

  const entries = useMemo(() => decodeInput(input, mode), [input, mode]);
  const multiple = entries.length > 1;

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12 sm:py-16">
      <nav className="flex flex-wrap items-center gap-1.5 font-mono text-muted-foreground text-xs">
        <Link className="transition-colors hover:text-primary" to="/">
          Clarigen Tools
        </Link>
        <ChevronRightIcon className="h-3 w-3 flex-shrink-0" />
        <span className="font-medium text-foreground">tx decoder</span>
      </nav>

      <section className="space-y-4 border-primary border-l-2 pl-5">
        <p className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">
          Transaction decoder
        </p>
        <h1 className="max-w-2xl font-medium font-mono text-3xl tracking-tight sm:text-4xl">
          Know what you're signing.
        </h1>
        <p className="max-w-2xl text-muted-foreground text-sm leading-6">
          Paste a serialized transaction, a txid, a single Clarity arg, a post-condition, or a{' '}
          <code>stx_callContract</code> request. Multiple values can go one per line.
        </p>
      </section>

      <section className="border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-border border-b bg-muted/30 px-4 py-3">
          <h2 className="font-medium font-mono text-sm">input</h2>
          <div className="flex flex-wrap gap-3">
            {TX_DECODER_EXAMPLES.map(example => (
              <button
                className="font-mono text-[10px] text-muted-foreground hover:text-primary hover:underline"
                key={example.label}
                onClick={() => {
                  setInput(example.input);
                  setMode('auto');
                }}
                type="button"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3 p-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Label className="font-mono text-xs" htmlFor="tx-input">
              hex, txid, or JSON
            </Label>
            <div className="flex items-center gap-2">
              <Label className="font-mono text-[10px] text-muted-foreground" htmlFor="decode-as">
                decode as
              </Label>
              <Select.Select
                onValueChange={value => {
                  const match = DECODE_MODES.find(m => m.value === value);
                  if (match) setMode(match.value);
                }}
                value={mode}
              >
                <Select.SelectTrigger className="h-7 w-44 font-mono text-xs" id="decode-as">
                  <Select.SelectValue />
                </Select.SelectTrigger>
                <Select.SelectContent>
                  {DECODE_MODES.map(option => (
                    <Select.SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </Select.SelectItem>
                  ))}
                </Select.SelectContent>
              </Select.Select>
            </div>
          </div>
          <Textarea
            className="min-h-32 font-mono text-xs"
            id="tx-input"
            onChange={event => {
              setInput(event.target.value);
            }}
            placeholder="0x00000000010400…"
            value={input}
          />
          <p className="font-mono text-[10px] text-muted-foreground">
            0x prefix is optional. unsigned transactions work too.
          </p>
        </div>
      </section>

      {entries.length === 0 ? (
        <div className="border border-border bg-card p-4 text-muted-foreground text-sm">
          paste something to decode.
        </div>
      ) : null}

      {entries.map((entry, index) => (
        <div className="space-y-3" key={`${index}:${entry.source}`}>
          {multiple || entry.status === 'ok' ? (
            <div className="flex flex-wrap items-baseline gap-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              {multiple ? <span>#{index}</span> : null}
              {entry.status === 'ok' ? (
                <span className="text-primary">{ITEM_LABELS[entry.item.kind]}</span>
              ) : null}
              {multiple ? (
                <span className="truncate normal-case tracking-normal">{entry.source}</span>
              ) : null}
            </div>
          ) : null}
          {entry.status === 'ok' ? (
            <DecodedItemView item={entry.item} />
          ) : (
            <p className="border border-border bg-card p-4 font-mono text-destructive text-xs">
              × {entry.message}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
