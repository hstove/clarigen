import type { Metadata } from 'next';
import { Input } from '@/components/ui/input';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { textVariants } from '@/lib/text-variants';
import { Text } from '@/components/text';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Clarigen types generator',
  description: 'Generate Clarigen types and view docs for any Clarity contract',
};

export function ExampleCard({
  name,
  description,
  contractId,
}: {
  name: string;
  description: string;
  contractId: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded border px-4 py-2">
      <div>
        <Text variant="p" className="font-mono font-semibold">
          {name}
        </Text>
      </div>
      <div>
        <Text variant="small" className="font-light">
          {description}
        </Text>
      </div>
      <div className="grow"></div>
      <div>
        <Button variant="secondary" className="mt-1 w-full" asChild>
          <Link href={`/contracts/${contractId}`}>View</Link>
        </Button>
      </div>
    </div>
  );
}

export default function GeneratorPage() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Generate Clarigen types</PageHeaderHeading>
        <PageHeaderDescription>
          Enter any Stacks contract ID to get automatically generated types and contract
          documentation.
        </PageHeaderDescription>
        <PageActions className="max-w-[600px]">
          <Input
            placeholder="Enter a contract ID, like SP123...contract-name"
            // className="text-md h-10 px-4 py-2"
          />
          <Button>Submit</Button>
        </PageActions>
        <div>
          <Text variant="Caption02" className="text-muted-foreground">
            Or, see some examples:
          </Text>
        </div>
        <PageActions>
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/contracts/SP000000000000000000002Q6VF78.pox-4`}>pox-4</Link>
          </Button>
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/contracts/SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.amm-swap-pool-v1-1`}>
              ALEX AMM
            </Link>
          </Button>
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/contracts/SP000000000000000000002Q6VF78.bns`}>BNS</Link>
          </Button>
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/contracts/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stacking-dao-core-v1`}>
              StackingDAO Core
            </Link>
          </Button>
        </PageActions>
      </PageHeader>
    </div>
  );
}
