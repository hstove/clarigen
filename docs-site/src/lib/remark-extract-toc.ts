import type { VFile } from 'vfile';
// import { Parent } from 'unist';
import { visit } from 'unist-util-visit';
import type { Heading } from 'mdast';
import { slug } from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import { remark } from 'remark';
import type { Toc, UnistTree } from 'types/unist';

export function remarkTocHeadings() {
  return (tree: UnistTree, file: VFile) => {
    const toc: Toc = [];
    visit(tree, 'heading', (node: Heading) => {
      const textContent = toString(node);
      toc.push({
        value: textContent,
        url: `#${slug(textContent)}`,
        depth: node.depth,
      });
    });
    file.data.toc = toc;
  };
}

/**
 *
 * @param {string} markdown
 * @return {Toc} toc
 */
export async function extractTocHeadings(markdown: string): Promise<Toc> {
  const vfile = await remark().use(remarkTocHeadings).process(markdown);
  return vfile.data.toc as Toc;
}
