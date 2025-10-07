import { allDocs } from 'contentlayer/generated';

export async function GET(request: Request) {
  const slugs = [
    'apps/quick-start',
    'apps/read-only-functions',
    'apps/transactions',
    'apps/factory',
    'apps/deployments',
    'apps/post-conditions',
    'apps/node',
  ];

  const docs = slugs.map(s => {
    const doc = allDocs.find(d => d.slug === `/docs/${s}`);
    if (!doc) {
      throw new Error(`Missing doc: ${s}`);
    }

    return doc;
  });

  const mdChunks = docs.map(d => {
    return `# ${d.title}

${d.body.raw}
    `;
  });

  return new Response(`# Using Clarigen

${mdChunks}
`);
}
