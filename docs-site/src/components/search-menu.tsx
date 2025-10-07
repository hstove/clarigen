'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { DialogProps } from '@radix-ui/react-dialog';
import { CircleIcon, FileIcon, LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

// import { docsConfig } from '@/config/docs';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { docsSidebar } from '@/lib/sidebar';
import { allDocs } from 'contentlayer/generated';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

const commandItems = docsSidebar.map(group => {
  const { items, ...rest } = group;
  return {
    items: group.items
      .map(navItem => {
        const doc = allDocs.find(doc => doc.slug === navItem.href);
        if (!doc) {
          return null;
          // throw new Error(`Could not find doc for ${navItem.href}`);
        }
        return {
          doc,
          ...navItem,
        };
      })
      .filter(i => i !== null),
    ...rest,
  };
});

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // const commandItems = React.useMemo(() => {

  // }, []);

  // React.useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
  //       // if (
  //       //   (e.target instanceof HTMLElement && e.target.isContentEditable) ||
  //       //   e.target instanceof HTMLInputElement ||
  //       //   e.target instanceof HTMLTextAreaElement ||
  //       //   e.target instanceof HTMLSelectElement
  //       // ) {
  //       //   return;
  //       // }

  //       // e.preventDefault();
  //       // setOpen(open => !open);
  //     }
  //   };

  //   document.addEventListener('keydown', down);
  //   return () => document.removeEventListener('keydown', down);
  // }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'bg-background text-muted-foreground relative h-8 w-full justify-start rounded-lg text-sm font-normal shadow-none sm:pr-12 md:w-40 lg:w-64'
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="bg-muted pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {commandItems.map(group => (
            <React.Fragment key={group.title}>
              <CommandGroup heading={group.title}>
                {group.items.map(navItem => (
                  <CommandItem
                    key={navItem.href}
                    value={`${group.title}/${navItem.title}`}
                    onSelect={() => {
                      runCommand(() => router.push(navItem.href as string));
                    }}
                  >
                    {navItem.doc.title}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <SunIcon className="mr-2 size-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <MoonIcon className="mr-2 size-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <LaptopIcon className="mr-2 size-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
