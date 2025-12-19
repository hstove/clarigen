'use client';
import React from 'react';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { Icons } from './icons';
import { ModeToggle } from './mode-toggle';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { CommandMenu } from './search-menu';

export const Header: React.FC<{ children?: React.ReactNode }> = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const pathname = usePathname();
  const logo = React.useMemo(() => {
    if (!mounted) return <div className="size-6" />;
    if (resolvedTheme === 'dark') {
      return <Icons.logoDark className="size-6" />;
    }
    return <Icons.logoLight className="size-6" />;
  }, [resolvedTheme, mounted]);
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            {logo}
            <span className="hidden font-bold sm:inline-block">Clarigen</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname.startsWith('/docs')
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
              href="/docs/intro"
            >
              Docs
            </Link>
            <Link
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname.startsWith('/contracts')
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
              href="/contracts"
            >
              Generator
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>

          <div className="flex items-center">
            <Link
              href="https://github.com/hstove/clarigen"
              rel="noreferrer"
              target="_blank"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0'
                )}
              >
                <Icons.gitHub className="size-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
