import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { textVariants } from '@/lib/text-variants';
import { cn } from '@/lib/utils';

export interface TextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ className, variant, ...props }, ref) => {
    return <span className={cn(textVariants({ variant, className }))} ref={ref} {...props} />;
  }
);
Text.displayName = 'Text';

export { Text };
