import Image from 'next/image';
import { Text } from '@components/text';
import { allPosts, allExamples } from 'contentlayer/generated';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Example } from '@/components/example';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  const counterExample = allExamples.find(ex => ex.slug === 'counter-contract');
  // console.log(allExamples);
  const postsList = allPosts.map(post => {
    // console.log(post);
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
    <div className="container relative">
      <PageHeader>
        {/* <Announcement /> */}
        <PageHeaderHeading>Build Clarity apps with ease</PageHeaderHeading>
        <PageHeaderDescription>
          Clarigen automatically generates TypeScript code for your Clarity contracts.
        </PageHeaderDescription>
        <PageHeaderDescription>
          Whether you&apos;re writing tests our building a web app, Clarigen makes development a
          breeze.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="lg">
            <Link href="/docs/getting-started">Learn more</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <div className="flex gap-4">
        <div className="w-full md:w-1/2">
          <Example name="home/counter-contract" />
        </div>
        <div className="w-full md:w-1/2">
          <Example name="home/counter-tests" />
        </div>
      </div>
    </div>
  );
  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //     {postsList}
  //   </main>
  // );
}
