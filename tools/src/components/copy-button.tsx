import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function CopyButton({
  text,
  label = 'copy',
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const buttonText = copied ? 'copied' : label;

  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      }}
      size="xs"
      type="button"
      variant="outline"
    >
      {buttonText}
    </Button>
  );
}
