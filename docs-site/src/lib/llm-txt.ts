import { allDocs } from 'contentlayer/generated';

export function generateLlmTxt(slugs: string[]) {
  const docs = slugs.map((s) => {
    const doc = allDocs.find((d) => d.slug === `/docs/${s}`);
    if (!doc) {
      throw new Error(`Missing doc: ${s}`);
    }

    return doc;
  });

  const mdChunks = docs.map(
    (d) => `# ${d.title}

${d.body.raw}
    `
  );

  return new Response(
    `# Using Clarigen

${mdChunks}
`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    }
  );
}
