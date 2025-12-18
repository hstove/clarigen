import { NETWORK } from '@/lib/constants';

interface ExplorerLinkProps {
  txid: string;
  network: NETWORK;
}

export function ExplorerLink({ txid, network }: ExplorerLinkProps) {
  const normalizedTxid = txid.startsWith('0x') ? txid : `0x${txid}`;
  return (
    <a
      href={`https://explorer.hiro.so/txid/${normalizedTxid}?chain=${network}`}
      target="_blank"
      rel="noreferrer"
      className="text-xs text-primary hover:underline font-mono"
    >
      → explorer
    </a>
  );
}
