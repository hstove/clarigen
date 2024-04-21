import Image from 'next/image';
import { Text } from '@components/text';
import { allPosts } from 'contentlayer/generated';

export default function Home() {
  const postsList = allPosts.map(post => {
    console.log(post);
    return (
      <article key={post._id} className="max-w-2xl">
        <Text variant="h2">
          <a href={`/docs/${post._raw.flattenedPath}`}>{post.title}</a>
        </Text>
        <pre className="pre overflow-x-scroll">
          <code>{JSON.stringify(post, null, 2)}</code>
        </pre>
      </article>
    );
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {postsList}
    </main>
  );
}
