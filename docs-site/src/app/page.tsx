import Image from 'next/image';
import { Text } from '@components/text';
import { allExamples } from 'contentlayer/generated';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Example } from '@/components/example';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';

export default async function Home() {
  const counterExample = allExamples.find(ex => ex.slug === 'counter-contract');
  return (
    <div className="container relative">
      <PageHeader>
        {/* <Announcement /> */}
        <PageHeaderHeading>Build Clarity apps with ease</PageHeaderHeading>
        <PageHeaderDescription>
          Clarigen automatically generates{' '}
          <span className="font-bold">TypeScript code for your Clarity contracts</span>.
        </PageHeaderDescription>
        <PageHeaderDescription>
          Whether you&apos;re writing tests our building a web app,{' '}
          <span className="font-bold text-green-600">Clarigen makes development a breeze</span>.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="lg">
            <Link href="/docs/getting-started">Learn more</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <div className="flex flex-col gap-3">
        <Text variant="h3">Want to see an example?</Text>
        <Tabs defaultValue="test">
          <TabsList>
            <TabsTrigger value="test">
              <span className="font-mono">counter.test.ts</span>
            </TabsTrigger>
            <TabsTrigger value="contract">
              <span className="font-mono">counter.clar</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="contract">
            <Example name="home/counter-contract" />
          </TabsContent>
          <TabsContent value="test">
            <Example name="home/counter-tests" />
          </TabsContent>
        </Tabs>
        {/* <div className="flex gap-4">
          <div className="w-full md:w-1/2">
            <Example name="home/counter-contract" />
          </div>
          <div className="w-full md:w-1/2">
            <Example name="home/counter-tests" />
          </div>
        </div> */}
      </div>
    </div>
  );
}
