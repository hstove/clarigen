import { DocToc } from '@/components/doc-toc';
import { Mdx } from '@/components/mdx-components';
import { Text } from '@/components/text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { allDocs } from 'contentlayer/generated';
import { Toc } from 'types/unist';

interface DocPageProps {
  params: {
    slug: string[];
  };
}

function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join('/') || '';
  const doc = allDocs.find(doc => {
    // console.log('Doc listing', doc.slugAsParams, slug);
    return doc.slugAsParams === slug;
  });
  // const doc = allDocs.find(doc => doc.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

export const generateStaticParams = async () =>
  allDocs.map(post => ({ slug: post.slugAsParams.split('/') }));

export const generateMetadata = ({ params }: DocPageProps) => {
  const post = getDocFromParams({ params });
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

export const DocsPage = ({ params }: DocPageProps) => {
  const post = getDocFromParams({ params });
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return (
    <article className="grow">
      <div className="w-full flex-1 items-start pb-10 lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10">
        <div className="flex grow flex-col gap-10">
          <div className="flex max-w-2xl flex-col gap-10">
            <div className="mt-4">
              <Text variant="h1">{post.title}</Text>
            </div>
            <Mdx code={post.body.code} />
          </div>
        </div>
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-x-auto p-4 lg:sticky lg:block">
          <ScrollArea className="h-full">
            <DocToc toc={post.toc as unknown as Toc} />
          </ScrollArea>
        </aside>
      </div>
    </article>
  );
};

export default DocsPage;
