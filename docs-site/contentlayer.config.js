import {
  // ComputedFields,
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { codeImport } from 'remark-code-import';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { rehypeComponent } from './src/lib/rehype-component';
import { rehypeNpmCommand } from './src/lib/rehype-npm-command';
import { getHighlighter, loadTheme } from '@shikijs/compat';
import rehypeExternalLinks from 'rehype-external-links';
import path from 'path';
import { rehypePlugins, remarkPlugins } from './src/lib/mdx-utils';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    resolve: doc => `/${doc._raw.flattenedPath}`,
  },
  // slugAsParams: {
  //   type: 'string',
  //   resolve: doc => `${doc._raw.flattenedPath}`,
  // },
  slugAsParams: {
    type: 'string',
    resolve: doc => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  // url: { type: 'string', resolve: post => `/docs/${post._raw.flattenedPath}` },
};

const LinksProperties = defineNestedType(() => ({
  name: 'LinksProperties',
  fields: {
    doc: {
      type: 'string',
    },
    api: {
      type: 'string',
    },
  },
}));

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    sidebar_label: { type: 'string' },
    // date: { type: 'date', required: true },
  },
  computedFields,
}));

export const Example = defineDocumentType(() => ({
  name: 'Example',
  filePathPattern: 'examples/**/*.mdx',
  contentType: 'mdx',
  computedFields,
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Example],
  mdx: {
    remarkPlugins: remarkPlugins,
    rehypePlugins: rehypePlugins,
  },
});
