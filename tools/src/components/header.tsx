import { ClientOnly, Link } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const WalletButton = lazy(() =>
  import('./wallet-button').then((m) => ({ default: m.WalletButton }))
);

export function Header() {
  return (
    <header className="border-border border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6 font-mono">
        <Link
          className="font-medium text-sm tracking-tight transition-colors hover:text-primary"
          to="/"
        >
          <span className="text-muted-foreground">$</span> clarigen
        </Link>
        <div className="ml-auto">
          <ClientOnly
            fallback={
              <span className="font-mono text-muted-foreground text-xs">
                connect
              </span>
            }
          >
            <Suspense
              fallback={
                <span className="font-mono text-muted-foreground text-xs">
                  connect
                </span>
              }
            >
              <WalletButton />
            </Suspense>
          </ClientOnly>
        </div>
      </div>
    </header>
  );
}
