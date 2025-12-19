import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// @ts-expect-error
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { codeImport } from 'remark-code-import';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { rehypeComponent } from './rehype-component';
import { rehypeNpmCommand } from './rehype-npm-command';
// import { getHighlighter, loadTheme } from '@shikijs/compat';
// import { getHighlighter } from 'shiki';
import rehypeExternalLinks from 'rehype-external-links';
import { bundleMDX } from 'mdx-bundler';

const rehypePrettyCodeOptions: PrettyCodeOptions = {
  theme: {
    dark: 'vitesse-black',
    light: 'vitesse-light',
  },
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className?.push('line--highlighted');
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ['word--highlighted'];
  },
};

export const remarkPlugins = [remarkGfm, codeImport];
export const rehypePlugins = [
  rehypeSlug,
  rehypeComponent,
  // withToc,
  // withTocExport,
  [
    rehypeExternalLinks,
    {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
    },
  ],
  // @ts-expect-error
  () => (tree) => {
    visit(tree, (node) => {
      if (node?.type === 'element' && node?.tagName === 'pre') {
        const [codeEl] = node.children;
        if (codeEl.tagName !== 'code') {
          return;
        }

        if (codeEl.data?.meta) {
          // Extract event from meta and pass it down the tree.
          const regex = /event="([^"]*)"/;
          const match = codeEl.data?.meta.match(regex);
          if (match) {
            node.__event__ = match ? match[1] : null;
            codeEl.data.meta = codeEl.data.meta.replace(regex, '');
          }
        }
        node.__rawString__ = codeEl.children?.[0].value;
        node.__src__ = node.properties?.__src__;
        node.__style__ = node.properties?.__style__;
      }
    });
  },
  [rehypePrettyCode, rehypePrettyCodeOptions],
  // @ts-expect-error
  () => (tree) => {
    visit(tree, (node) => {
      if (node?.type === 'element' && node?.tagName === 'figure') {
        if (!('data-rehype-pretty-code-figure' in node.properties)) {
          return;
        }

        const preElement = node.children.at(-1);
        if (preElement.tagName !== 'pre') {
          return;
        }

        preElement.properties.__withMeta__ =
          node.children.at(0).tagName === 'div';
        preElement.properties.__rawString__ = node.__rawString__;

        if (node.__src__) {
          preElement.properties.__src__ = node.__src__;
        }

        if (node.__event__) {
          preElement.properties.__event__ = node.__event__;
        }

        if (node.__style__) {
          preElement.properties.__style__ = node.__style__;
        }
      }
    });
  },
  rehypeNpmCommand,
  [
    rehypeAutolinkHeadings,
    {
      properties: {
        className: ['subheading-anchor'],
        ariaLabel: 'Link to section',
      },
    },
  ],
];

export async function compileMdx(markdown: string) {
  const result = await bundleMDX({
    source: markdown,
    mdxOptions: (options) => {
      // @ts-expect-error
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...remarkPlugins,
      ];
      // @ts-expect-error
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        ...rehypePlugins,
      ];
      return options;
    },
  });

  // const toc = (result as any).tableOfContents as Toc;

  return { ...result };
}
