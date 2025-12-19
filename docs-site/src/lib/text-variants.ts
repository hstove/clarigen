import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';

export const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 pb-2 font-semibold text-3xl tracking-tight transition-colors first:mt-0',
      h3: 'scroll-m-20 font-semibold text-2xl tracking-tight',
      h4: 'scroll-m-20 font-semibold text-xl tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      th: 'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
      td: 'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm',
      lead: 'text-muted-foreground text-xl',
      large: 'font-semibold text-lg',
      small: 'font-medium text-sm leading-none',
      muted: 'text-muted-foreground text-sm',
      Body01: 'text-body01',
      Body02: 'text-body02',
      Caption01: 'text-caption01 text-text-subdued',
      Caption02: 'text-caption02 text-text-subdued',
      Heading01: 'font-open-sauce text-heading01',
      Heading02: 'font-open-sauce text-heading02',
      Heading03: 'font-open-sauce text-heading03',
      Heading035: 'font-open-sauce text-heading035',
      Heading04: 'font-open-sauce text-heading04',
      Heading05: 'font-open-sauce text-heading05',
      Heading06: 'font-open-sauce text-heading06',
      Heading022: 'font-open-sauce text-heading022',
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
