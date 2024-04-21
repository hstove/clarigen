import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';

export const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      th: 'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
      td: 'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
      code: 'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-muted-foreground text-xl',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-muted-foreground text-sm',
      Body01: 'text-body01',
      Body02: 'text-body02',
      Caption01: 'text-text-subdued text-caption01',
      Caption02: 'text-text-subdued text-caption02',
      Heading01: 'text-heading01 font-open-sauce',
      Heading02: 'text-heading02 font-open-sauce',
      Heading03: 'text-heading03 font-open-sauce',
      Heading035: 'text-heading035 font-open-sauce',
      Heading04: 'text-heading04 font-open-sauce',
      Heading05: 'text-heading05 font-open-sauce',
      Heading06: 'text-heading06 font-open-sauce',
      Heading022: 'text-heading022 font-open-sauce',
      Display01: 'text-display01',
      Display02: 'text-display02',
      Label01: 'text-label01',
      Label02: 'text-label02',
    },
  },
  defaultVariants: {
    variant: 'Body01',
  },
});

type TextVariants = VariantProps<typeof textVariants> & { className?: string };

export type TextVariantProps = VariantProps<typeof textVariants>;

export function textStyles({ variant, className }: TextVariants) {
  return cn(textVariants({ variant, className }));
}
