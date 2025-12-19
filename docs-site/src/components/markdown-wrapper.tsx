import { Mdx } from '@/components/mdx-components';
import { compileMdx } from '@/lib/mdx-utils';
import type React from 'react';

export type MarkdownWrapperProps = React.HTMLAttributes<HTMLElement> & {
  markdown: string;
};

export async function MarkdownWrapper({
  markdown,
  className,
  ...props
}: MarkdownWrapperProps) {
  const compiled = await compileMdx(markdown);

  return (
    <div className={className} {...props}>
      <Mdx code={compiled.code} />
    </div>
  );
}
