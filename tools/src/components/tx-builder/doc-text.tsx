/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import { cn } from '@/lib/utils';

type DocTextProps = {
  text: string[];
  className?: string;
  paragraphClassName?: string;
};

function toParagraphs(text: string[]) {
  const paragraphs: string[] = [];
  let current: string[] = [];

  // biome-ignore lint/complexity/noForEach: ignored using `--suppress`
  text.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed === '') {
      if (current.length > 0) {
        paragraphs.push(current.join(' '));
        current = [];
      }
      return;
    }
    current.push(trimmed);
  });

  if (current.length > 0) {
    paragraphs.push(current.join(' '));
  }

  return paragraphs;
}

export function DocText({ text, className, paragraphClassName }: DocTextProps) {
  const paragraphs = toParagraphs(text);
  if (paragraphs.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      {paragraphs.map((paragraph, index) => (
        <p
          className={cn(
            'text-muted-foreground text-xs leading-relaxed',
            paragraphClassName
          )}
          key={`${paragraph.slice(0, 12)}-${index}`}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
