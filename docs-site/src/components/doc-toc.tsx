import { textStyles } from '@/lib/text-variants';
import type { Toc } from 'types/unist';

export function DocTocItem({ item }: { item: Toc[number] }) {
  const name = item.value;
  const baseMargin = 12; // px per depth
  const depth = Math.max(2, item.depth) - 2;
  const margin = `${baseMargin * depth}px`;
  return (
    <div>
      <a
        className={textStyles({
          variant: 'small',
          className:
            'text-muted-foreground text-xs underline underline-offset-4',
        })}
        href={item.url}
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
  const items = toc.map((item) => <DocTocItem item={item} key={item.value} />);

  return <div className="flex flex-col gap-1">{items}</div>;
}
