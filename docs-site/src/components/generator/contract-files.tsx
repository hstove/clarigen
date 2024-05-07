'use client';
import React from 'react';
import type { GeneratedContractFiles } from '@/lib/code-gen';
// import { Mdx } from '@/components/mdx-components';
import { Text } from '@/components/text';
import { ClarityAbi, toCamelCase } from '@clarigen/core';
import { CopyButton, CopyWithText } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { CodeBlock } from '@/components/code-block';
import { ContractToc } from '@/components/contract-toc';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mdx } from '../mdx-components';
import { CodeBlock } from '../code-block';

export function GeneratedContractFiles({
  files,
  docsNode,
  typesNode,
  usageNode,
  clarityNode,
}: {
  files: GeneratedContractFiles;
  docsNode: React.ReactNode;
  typesNode: React.ReactNode;
  usageNode: React.ReactNode;
  clarityNode: React.ReactNode;
}) {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);
  if (!loaded) return null;
  return (
    <div className="w-full">
      <div className="items-between container flex w-full flex-col justify-between border-b py-4 md:flex-row">
        <div className="flex items-center gap-3">
          <Text variant="h4" className="sm:text-md break-all text-xs md:text-xl">
            {files.contractId}
          </Text>
          <CopyButton value={files.contractId} />
        </div>
        <div className="flex gap-3 md:justify-end">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`https://explorer.stacks.co/txid/${files.contractId}`}>
              <span className="mr-2">Hiro explorer</span>
              <ExternalLinkIcon className="size-4" />
            </Link>
          </Button>
          <Button size="sm" variant="secondary" asChild>
            <Link href={`https://stxscan.co/accounts/${files.contractId}`}>
              <span className="mr-2">STX Scan</span>
              <ExternalLinkIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="container">
        <Tabs defaultValue="docs" className="mt-4 flex flex-col rounded-md border">
          <div className="flex w-full flex-col justify-between gap-3 border-b p-4 md:flex-row md:items-center">
            <TabsList>
              <TabsTrigger value="docs">Docs</TabsTrigger>
              <TabsTrigger value="types">Types</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="clarity">Clarity</TabsTrigger>
            </TabsList>

            <TabsContent value="docs" className="mt-0">
              <div className="flex justify-end gap-3">
                <CopyWithText
                  value={files.markdownWithToc}
                  text={'Copy Markdown'}
                  variant="secondary"
                />
              </div>
            </TabsContent>
          </div>
          <div className="w-full">
            <TabsContent value="docs" className="mt-0">
              <div className="w-full flex-1 items-start pb-10 md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
                <aside className="fixed top-14 z-30 -mr-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-x-auto border-r p-4 md:sticky md:block">
                  <ScrollArea className="h-full">
                    <ContractToc contract={files.docContract} />
                  </ScrollArea>
                </aside>
                {docsNode}
                {/* <Mdx code={files.mdx} className="p-4" /> */}
              </div>
              {/* <div className="flex flex-col md:flex-row">
                <Mdx code={files.mdx} className="p-4" />
                <aside className="fixed top-14 z-30 -mr-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-l p-4 md:sticky md:block">
                  <ScrollArea className="h-full">
                    <ContractToc contract={files.docContract} />
                  </ScrollArea>
                </aside>
              </div> */}
            </TabsContent>
            <TabsContent value="types" className="p-4 pt-0">
              {typesNode}
              {/* <CodeBlock code={files.types} language="typescript" showLineNumbers /> */}
            </TabsContent>
            <TabsContent value="usage" className="p-4 pt-0">
              {usageNode}
              {/* <CodeBlock code={files.usage} language="typescript" showLineNumbers /> */}
            </TabsContent>
            <TabsContent value="clarity" className="p-4 pt-0">
              {clarityNode}
              {/* <CodeBlock code={files.clarity} language="clarity" showLineNumbers /> */}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
