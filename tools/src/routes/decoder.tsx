import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronRightIcon } from 'lucide-react';
import { useMemo } from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import { hexToCV } from '@stacks/transactions';
import { cvToJSON, cvToString } from '@clarigen/core';
import { ClarityValueView } from '@/components/clarity-value-view';
import { CopyButton } from '@/components/copy-button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DECODER_EXAMPLES } from '@/lib/decoder-examples';
import { normalizeHex, stripHexPrefix } from '@/lib/hex';

export const Route = createFileRoute('/decoder')({
  component: DecoderPage,
});

function DecoderPage() {
  const [hex, setHex] = useQueryState('hex', parseAsString.withDefault(''));

  const decoded = useMemo(() => {
    const compact = stripHexPrefix(hex);
    if (compact.length === 0) return { status: 'empty' as const };
    try {
      const normalized = normalizeHex(hex);
      const value = hexToCV(normalized);
      return {
        status: 'ok' as const,
        normalized,
        value,
        clarity: cvToString(value, { indent: 2 }),
        json: JSON.stringify(cvToJSON(value, true), null, 2),
      };
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'failed to decode',
      };
    }
  }, [hex]);

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12 sm:py-16">
      <nav className="flex flex-wrap items-center gap-1.5 font-mono text-muted-foreground text-xs">
        <Link className="transition-colors hover:text-primary" to="/">
          Clarigen Tools
        </Link>
        <ChevronRightIcon className="h-3 w-3 flex-shrink-0" />
        <span className="font-medium text-foreground">decoder</span>
      </nav>

      <section className="space-y-4 border-primary border-l-2 pl-5">
        <p className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">
          Clarity value decoder
        </p>
        <h1 className="max-w-2xl font-medium font-mono text-3xl tracking-tight sm:text-4xl">
          deserializeCV, then read it.
        </h1>
        <p className="max-w-2xl text-muted-foreground text-sm leading-6">
          Paste any serialized Clarity value as hex. The decoder turns it into
          a structured view and a pretty-printed Clarity literal.
        </p>
      </section>

      <section className="border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-border border-b bg-muted/30 px-4 py-3">
          <h2 className="font-medium font-mono text-sm">hex</h2>
          <div className="flex flex-wrap gap-2">
            {DECODER_EXAMPLES.map((example) => (
              <button
                className="font-mono text-[10px] text-muted-foreground hover:text-primary hover:underline"
                key={example.label}
                onClick={() => {
                  void setHex(example.hex);
                }}
                type="button"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3 p-4">
          <Label className="font-mono text-xs" htmlFor="cv-hex">
            serialized clarity value
          </Label>
          <Textarea
            className="min-h-28 font-mono"
            id="cv-hex"
            onChange={(event) => {
              void setHex(event.target.value);
            }}
            placeholder="0x0c00000002…"
            value={hex}
          />
          <p className="font-mono text-[10px] text-muted-foreground">
            0x prefix is optional. whitespace is ignored.
          </p>
        </div>
      </section>

      {decoded.status === 'empty' ? (
        <div className="border border-border bg-card">
          <div className="border-border border-b bg-muted/30 px-4 py-3">
            <h3 className="font-medium font-mono text-sm">decoded</h3>
          </div>
          <div className="p-4 text-muted-foreground text-sm">
            enter hex to deserialize a Clarity value.
          </div>
        </div>
      ) : null}

      {decoded.status === 'error' ? (
        <div className="border border-border bg-card">
          <div className="border-border border-b bg-muted/30 px-4 py-3">
            <h3 className="font-medium font-mono text-sm">decoded</h3>
          </div>
          <p className="p-4 font-mono text-destructive text-xs">
            × {decoded.message}
          </p>
        </div>
      ) : null}

      {decoded.status === 'ok' ? (
        <div className="space-y-4">
          <section className="border border-border bg-card">
            <div className="flex items-center justify-between gap-3 border-border border-b bg-muted/30 px-4 py-3">
              <h3 className="font-medium font-mono text-sm">value</h3>
              <CopyButton text={decoded.clarity} />
            </div>
            <div className="p-4">
              <ClarityValueView value={decoded.value} />
            </div>
          </section>

          <section className="border border-border bg-card">
            <div className="flex items-center justify-between gap-3 border-border border-b bg-muted/30 px-4 py-3">
              <h3 className="font-medium font-mono text-sm">clarity</h3>
              <CopyButton text={decoded.clarity} />
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap break-all p-4 font-mono text-xs leading-6">
              {decoded.clarity}
            </pre>
          </section>

          <details className="border border-border bg-card">
            <summary className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-muted/30">
              <span className="font-medium font-mono text-sm">json</span>
              <span className="font-mono text-[10px] text-muted-foreground">
                cvToJSON
              </span>
            </summary>
            <div className="border-border border-t px-4 py-3">
              <div className="mb-2 flex justify-end">
                <CopyButton text={decoded.json} />
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-xs leading-6">
                {decoded.json}
              </pre>
            </div>
          </details>
        </div>
      ) : null}
    </div>
  );
}
