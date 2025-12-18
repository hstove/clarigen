import { Link } from '@tanstack/react-router';
import { WalletButton } from './wallet-button';

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6 font-mono">
        <Link
          to="/"
          className="text-sm font-medium tracking-tight hover:text-primary transition-colors"
        >
          <span className="text-muted-foreground">$</span> clarigen
        </Link>
        <div className="ml-auto">
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
