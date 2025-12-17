import { Link } from '@tanstack/react-router';
import { WalletButton } from './wallet-button';

export function Header() {
  return (
    <>
      <header className="p-4 flex items-center gap-4 font-mono">
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/">Clarigen Tools</Link>
        </h1>
        <div className="ml-auto">
          <WalletButton />
        </div>
      </header>
    </>
  );
}
