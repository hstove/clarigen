import '@/app/styles/mdx.css';
import { Mdx } from '@/components/mdx-components';
import { Text } from '@/components/text';
import { allPosts } from 'contentlayer/generated';

interface DocPageProps {
  params: {
    slug: string[];
  };
}

function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join('/') || '';
  const doc = allPosts.find(doc => {
    console.log('Doc listing', doc.slugAsParams, slug);
    return doc.slugAsParams === slug;
  });
  // const doc = allPosts.find(doc => doc.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

export const generateStaticParams = async () =>
  allPosts.map(post => ({ slug: post.slugAsParams.split('/') }));

export const generateMetadata = ({ params }: DocPageProps) => {
  const post = getDocFromParams({ params });
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

export const DocsPage = ({ params }: DocPageProps) => {
  const post = getDocFromParams({ params });
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return (
    <article className="max-w-2xl">
      <div className="flex flex-col gap-10">
        <div className="mt-4">
          <Text variant="h1">{post.title}</Text>
        </div>
        <Mdx code={post.body.code} />
      </div>
    </article>
  );
};

export default DocsPage;
