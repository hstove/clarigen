import '@/app/styles/mdx.css';
import { Mdx } from '@/components/mdx-components';
import { Text } from '@/components/text';
import { allPosts } from 'contentlayer/generated';

export const generateStaticParams = async () =>
  allPosts.map(post => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(post => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

export const DocsPage = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(post => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return (
    <article className="max-w-2xl">
      <Text variant="h2">{post.title}</Text>
      <Mdx code={post.body.code} />
      <pre className="pre overflow-x-scroll">
        <code>{JSON.stringify(post, null, 2)}</code>
      </pre>
    </article>
  );
};

export default DocsPage;
