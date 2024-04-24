import { allExamples } from 'contentlayer/generated';
import { Mdx } from './mdx-components';

export function Example({ name }: { name: string }) {
  const example = allExamples.find(ex => ex.slugAsParams === name);
  if (!example) {
    throw new Error(`No example found for slug: ${name}`);
  }
  console.log(example.body.code);

  return <Mdx code={example.body.code} />;
}
