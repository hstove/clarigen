'use client';
// import { ClarityAbi } from '@clarigen/core';
import { textStyles, textVariants } from '@/lib/text-variants';
import { cn } from '@/lib/utils';
import { ClaridocContract, ClaridocItem } from '@clarigen/docs';
import { Text } from './text';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import React from 'react';
import { Button } from './ui/button';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';

function ContractTocItem({ item }: { item: ClaridocItem }) {
  const name = item.abi.name;
  return (
    <div className="">
      <a
        href={`#${name.toLowerCase().replaceAll('?', '')}`}
        className={textStyles({
          variant: 'small',
          className: 'text-muted-foreground underline underline-offset-4 text-xs',
        })}
      >
        {name}
      </a>
    </div>
  );
}

function ContractTocItems({ items, heading }: { items: ClaridocItem[]; heading: string }) {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="mt-2 flex items-center justify-between">
        <Text variant="h4">{heading}</Text>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            {isOpen ? <CaretDownIcon className="size-4" /> : <CaretUpIcon className="size-4" />}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="flex flex-col gap-1">
          {items.map(item => (
            <ContractTocItem key={item.abi.name} item={item} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function ContractToc({ contract }: { contract: ClaridocContract }) {
  const publics = contract.functions.filter(fn => fn.abi.access === 'public');
  const readOnly = contract.functions.filter(fn => fn.abi.access === 'read_only');
  const privates = contract.functions.filter(fn => fn.abi.access === 'private');
  const maps = contract.maps;
  const constants = contract.variables.filter(v => v.abi.access === 'constant');
  const vars = contract.variables.filter(v => v.abi.access === 'variable');

  return (
    <div className="flex w-full flex-col md:max-w-md">
      <ContractTocItems heading="Public functions" items={publics} />
      <ContractTocItems heading="Read-only functions" items={readOnly} />
      <ContractTocItems heading="Private functions" items={privates} />
      <ContractTocItems heading="Maps" items={maps} />
      <ContractTocItems heading="Constants" items={constants} />
      <ContractTocItems heading="Variables" items={vars} />
    </div>
  );
}
