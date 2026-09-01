import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronRightIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CopyButton } from '@/components/copy-button';
import { ClarityValueView } from '@/components/clarity-value-view';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as Select from '@/components/ui/select';
import { hexToBytes } from '@/lib/hex';
import {
  type BtcNetwork,
  POX_VERSION_LABELS,
  btcAddressToPoxTuple,
  poxTupleClarity,
  poxTupleToBtcAddress,
} from '@/lib/pox-address';

export const Route = createFileRoute('/btc-address')({
  component: BtcAddressPage,
});

const EXAMPLE_ADDRESSES = [
  {
    label: 'p2wpkh',
    address: 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
  },
  {
    label: 'p2pkh',
    address: '1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH',
  },
  {
    label: 'p2tr',
    address: 'bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqzk5jj0',
  },
] as const;

const VERSION_CHIPS = [
  { version: '0x00', label: 'p2pkh' },
  { version: '0x01', label: 'p2sh' },
  { version: '0x04', label: 'p2wpkh' },
  { version: '0x05', label: 'p2wsh' },
  { version: '0x06', label: 'p2tr' },
] as const;

function BtcAddressPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12 sm:py-16">
      <nav className="flex flex-wrap items-center gap-1.5 font-mono text-muted-foreground text-xs">
        <Link className="transition-colors hover:text-primary" to="/">
          Clarigen Tools
        </Link>
        <ChevronRightIcon className="h-3 w-3 flex-shrink-0" />
        <span className="font-medium text-foreground">btc address</span>
      </nav>

      <section className="space-y-4 border-primary border-l-2 pl-5">
        <p className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">
          PoX address tuple
        </p>
        <h1 className="max-w-2xl font-medium font-mono text-3xl tracking-tight sm:text-4xl">
          BTC address ↔ {'{ version, hashbytes }'}
        </h1>
        <p className="max-w-2xl text-muted-foreground text-sm leading-6">
          Convert a Bitcoin address into the Clarity pox-addr tuple used by
          pox-4 / pox-5, or rebuild an address from version and hashbytes hex.
        </p>
      </section>

      <FromAddress />
      <FromTuple />
    </div>
  );
}

function FromAddress() {
  const [address, setAddress] = useState('');

  const result = useMemo(() => {
    const trimmed = address.replace(/\s+/g, '');
    if (trimmed.length === 0) return { status: 'empty' as const };
    try {
      return {
        status: 'ok' as const,
        decoded: btcAddressToPoxTuple(trimmed),
      };
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'failed to decode',
      };
    }
  }, [address]);

  return (
    <section className="border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-border border-b bg-muted/30 px-4 py-3">
        <h2 className="font-medium font-mono text-sm">from btc address</h2>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_ADDRESSES.map((example) => (
            <button
              className="font-mono text-[10px] text-muted-foreground hover:text-primary hover:underline"
              key={example.label}
              onClick={() => setAddress(example.address)}
              type="button"
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div className="space-y-1.5">
          <Label className="font-mono text-xs" htmlFor="btc-address">
            bitcoin address
          </Label>
          <Input
            className="font-mono"
            id="btc-address"
            onChange={(event) => setAddress(event.target.value)}
            placeholder="bc1q… / 1… / 3… / tb1q…"
            value={address}
          />
        </div>

        {result.status === 'error' ? (
          <p className="font-mono text-destructive text-xs">× {result.message}</p>
        ) : null}

        {result.status === 'ok' ? (
          <TupleResult
            address={result.decoded.address}
            addressType={result.decoded.addressType}
            clarity={result.decoded.clarity}
            hashbytesHex={result.decoded.hashbytesHex}
            network={result.decoded.network}
            version={result.decoded.version}
            versionHex={result.decoded.versionHex}
          />
        ) : null}
      </div>
    </section>
  );
}

function FromTuple() {
  const [version, setVersion] = useState('0x00');
  const [hashbytes, setHashbytes] = useState('');
  const [network, setNetwork] = useState<BtcNetwork>('mainnet');

  const result = useMemo(() => {
    const versionStr = version.replace(/\s+/g, '');
    const hashStr = hashbytes.replace(/\s+/g, '');
    if (versionStr.length === 0 || hashStr.length === 0) {
      return { status: 'empty' as const };
    }
    try {
      return {
        status: 'ok' as const,
        ...poxTupleToBtcAddress(versionStr, hashStr, network),
      };
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'failed to encode',
      };
    }
  }, [version, hashbytes, network]);

  return (
    <section className="border border-border bg-card">
      <div className="border-border border-b bg-muted/30 px-4 py-3">
        <h2 className="font-medium font-mono text-sm">from tuple</h2>
      </div>
      <div className="space-y-4 p-4">
        <div className="grid gap-4 sm:grid-cols-[10rem_8rem_1fr]">
          <div className="space-y-1.5">
            <Label className="font-mono text-xs" htmlFor="btc-network">
              btc network
            </Label>
            <Select.Select
              onValueChange={(value) => {
                if (value === 'mainnet' || value === 'testnet') {
                  setNetwork(value);
                }
              }}
              value={network}
            >
              <Select.SelectTrigger className="w-full font-mono" id="btc-network">
                <Select.SelectValue />
              </Select.SelectTrigger>
              <Select.SelectContent>
                <Select.SelectItem value="mainnet">mainnet</Select.SelectItem>
                <Select.SelectItem value="testnet">testnet</Select.SelectItem>
              </Select.SelectContent>
            </Select.Select>
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono text-xs" htmlFor="pox-version">
              version
            </Label>
            <Input
              className="font-mono"
              id="pox-version"
              onChange={(event) => setVersion(event.target.value)}
              placeholder="0x00"
              value={version}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono text-xs" htmlFor="pox-hashbytes">
              hashbytes
            </Label>
            <Input
              className="font-mono"
              id="pox-hashbytes"
              onChange={(event) => setHashbytes(event.target.value)}
              placeholder="0x…"
              value={hashbytes}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {VERSION_CHIPS.map((chip) => (
            <Button
              key={chip.version}
              onClick={() => setVersion(chip.version)}
              size="xs"
              type="button"
              variant={version.replace(/\s+/g, '').toLowerCase() === chip.version ? 'default' : 'outline'}
            >
              {chip.version} {chip.label}
            </Button>
          ))}
        </div>
        <p className="font-mono text-[10px] text-muted-foreground">
          pox-addr tuple is {'{ version: (buff 1), hashbytes: (buff 32) }'}. hex
          may omit the 0x prefix.
        </p>

        {result.status === 'error' ? (
          <p className="font-mono text-destructive text-xs">× {result.message}</p>
        ) : null}

        {result.status === 'ok' ? (
          <TupleResult
            address={result.address}
            addressType={result.decoded.addressType}
            clarity={result.decoded.clarity}
            hashbytesHex={result.decoded.hashbytesHex}
            network={result.decoded.network}
            version={result.decoded.version}
            versionHex={result.decoded.versionHex}
          />
        ) : null}
      </div>
    </section>
  );
}

function TupleResult({
  version,
  versionHex,
  hashbytesHex,
  addressType,
  network,
  address,
  clarity,
}: {
  version: number;
  versionHex: string;
  hashbytesHex: string;
  addressType: string;
  network: BtcNetwork;
  address: string;
  clarity: string;
}) {
  const cv = poxTupleClarity(version, hexToBytes(hashbytesHex));

  return (
    <div className="space-y-3 border border-border bg-muted/10 p-4">
      <div className="flex justify-between gap-4 border-border/50 border-b py-1.5 text-xs">
        <span className="text-muted-foreground">version</span>
        <span className="break-all text-right font-mono">
          {versionHex}{' '}
          <span className="text-muted-foreground">
            {POX_VERSION_LABELS[version] ?? addressType}
          </span>
        </span>
      </div>
      <div className="flex justify-between gap-4 border-border/50 border-b py-1.5 text-xs">
        <span className="text-muted-foreground">hashbytes</span>
        <span className="flex min-w-0 items-start gap-2">
          <span className="break-all text-right font-mono">{hashbytesHex}</span>
          <CopyButton text={hashbytesHex} />
        </span>
      </div>
      <div className="flex justify-between gap-4 border-border/50 border-b py-1.5 text-xs">
        <span className="text-muted-foreground">network</span>
        <span className="font-mono">{network}</span>
      </div>
      <div className="flex justify-between gap-4 border-border/50 border-b py-1.5 text-xs last:border-0">
        <span className="text-muted-foreground">address</span>
        <span className="flex min-w-0 items-start gap-2">
          <span className="break-all text-right font-mono">{address}</span>
          <CopyButton text={address} />
        </span>
      </div>
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            clarity tuple
          </span>
          <CopyButton text={clarity} />
        </div>
        <ClarityValueView value={cv} />
      </div>
    </div>
  );
}

