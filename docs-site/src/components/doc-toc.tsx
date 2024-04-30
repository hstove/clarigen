import { textStyles } from '@/lib/text-variants';
import React from 'react';
import { Toc } from 'types/unist';

export function DocTocItem({ item }: { item: Toc[number] }) {
  const name = item.value;
  const baseMargin = 12; // px per depth
  const depth = Math.max(2, item.depth) - 2;
  const margin = `${baseMargin * depth}px`;
  return (
    <div>
      <a
        href={item.url}
        className={textStyles({
          variant: 'small',
          className: 'text-muted-foreground underline underline-offset-4 text-xs',
        })}
        style={{
          paddingLeft: margin,
        }}
      >
        {name}
      </a>
    </div>
  );
}

export function DocToc({ toc }: { toc: Toc }) {
  const items = toc.map(item => <DocTocItem key={item.value} item={item} />);

  return <div className="flex flex-col gap-1">{items}</div>;
}
