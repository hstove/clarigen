import { getHighlighter, bundledLanguages } from 'shiki';
import darkTheme from '@/lib/themes/dark.json';
import lightTheme from '@/lib/themes/light.json';
import { cn } from '@/lib/utils';
import { MarkdownWrapper } from './markdown-wrapper';

export const codeToHtml = async ({ code, language }: { code: string; language: string }) => {
  const highlighter = await getHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: Object.keys(bundledLanguages),
  });
  return highlighter.codeToHtml(code, {
    lang: language,
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
  });
};

export type CodeBlockProps = React.HTMLAttributes<HTMLElement> & {
  code: string;
  language: string;
  showLineNumbers?: boolean;
};

export async function CodeBlock({
  code,
  language,
  className,
  showLineNumbers,
  ...props
}: CodeBlockProps) {
  const lineNumber = showLineNumbers ? ' showLineNumbers' : '';
  const markdown = `\`\`\`${language}${lineNumber}\n${code}\n\`\`\``;

  // return (
  //   <code
  //     className={cn(
  //       'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm',
  //       className
  //     )}
  //     {...props}
  //   >
  //     <div
  //       className="overflow-x-auto"
  //       dangerouslySetInnerHTML={{
  //         __html: html,
  //       }}
  //     />
  //   </code>
  // );
  // @ts-ignore
  return <MarkdownWrapper markdown={markdown} className={className} {...props} />;
}
