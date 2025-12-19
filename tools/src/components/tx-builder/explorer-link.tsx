import type { NETWORK } from '@/lib/constants';

type ExplorerLinkProps = {
  txid: string;
  network: NETWORK;
};

export function ExplorerLink({ txid, network }: ExplorerLinkProps) {
  const normalizedTxid = txid.startsWith('0x') ? txid : `0x${txid}`;
  return (
    <a
      className="font-mono text-primary text-xs hover:underline"
      href={`https://explorer.hiro.so/txid/${normalizedTxid}?chain=${network}`}
      rel="noreferrer"
      target="_blank"
    >
      → explorer
    </a>
  );
}
