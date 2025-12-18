import { Mdx } from '@/components/mdx-components';
import { CodeBlock } from '@/components/code-block';
import { generateContractFiles } from '@/lib/code-gen';
import { GeneratedContractFiles } from '@/components/generator/contract-files';

export type ContractPageProps = {
  params: {
    contractId: string;
  };
};

export const revalidate = 3000;

export default async function ContractPage({ params }: ContractPageProps) {
  const { contractId } = params;
  const files = await generateContractFiles(contractId);

  return (
    <GeneratedContractFiles
      files={files}
      docsNode={<Mdx code={files.mdx} className="p-4" />}
      // @ts-ignore
      typesNode={<CodeBlock code={files.types} language="typescript" showLineNumbers />}
      // @ts-ignore
      usageNode={<CodeBlock code={files.usage} language="typescript" showLineNumbers />}
      // @ts-ignore
      clarityNode={<CodeBlock code={files.clarity} language="clarity" showLineNumbers />}
      // usageNode={<Mdx code={files.us} className="p-4" />}
    />
  );
  // return (
  //   <div className="w-full">
  //     <div className="items-between container flex w-full justify-between border-b py-4">
  //       <div className="gap-3">
  //         <Text variant="h3">{params.contractId}</Text>
  //       </div>
  //       <div className="flex gap-3 md:justify-end">
  //         <CopyWithText value={files.markdown} text={'Copy Markdown'} variant="secondary" />
  //         <Button size="sm" variant="secondary" asChild>
  //           <Link href={`https://explorer.stacks.co/txid/${params.contractId}`}>
  //             <span className="mr-2">View on explorer</span>
  //             <ExternalLinkIcon className="size-4" />
  //           </Link>
  //         </Button>
  //       </div>
  //     </div>
  //     <div className="container">
  //       <Tabs defaultValue="docs" className="mt-4 flex flex-col rounded-md border">
  //         <div className="flex w-full items-center justify-between border-b p-4">
  //           <TabsList>
  //             <TabsTrigger value="docs">Docs</TabsTrigger>
  //             <TabsTrigger value="types">Types</TabsTrigger>
  //           </TabsList>
  //           <div className="flex justify-end">
  //             <TabsContent value="docs">
  //               <Button variant={'secondary'} size="sm">
  //                 Docs stuff
  //               </Button>
  //             </TabsContent>
  //           </div>
  //         </div>
  //         <div className="w-full">
  //           <TabsContent value="docs" className="mt-0">
  //             <div className="w-full flex-1 items-start pb-10 md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
  //               <aside className="fixed top-14 z-30 -mr-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-x-auto border-r p-4 md:sticky md:block">
  //                 <ScrollArea className="h-full">
  //                   <ContractToc contract={files.docContract} />
  //                 </ScrollArea>
  //               </aside>
  //               <Mdx code={files.mdx} className="p-4" />
  //             </div>
  //             {/* <div className="flex flex-col md:flex-row">
  //               <Mdx code={files.mdx} className="p-4" />
  //               <aside className="fixed top-14 z-30 -mr-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-l p-4 md:sticky md:block">
  //                 <ScrollArea className="h-full">
  //                   <ContractToc contract={files.docContract} />
  //                 </ScrollArea>
  //               </aside>
  //             </div> */}
  //           </TabsContent>
  //           <TabsContent value="types">
  //             <div className="p-4">
  //               <CodeBlock code={files.types} language="typescript" showLineNumbers />
  //             </div>
  //           </TabsContent>
  //         </div>
  //       </Tabs>
  //     </div>
  //   </div>
  // );
}
