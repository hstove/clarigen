import { allDocs } from 'contentlayer/generated';

export async function GET(request: Request) {
  const slugs = [
    'unit-tests/quick-start',
    'unit-tests/example',
    'unit-tests/api',
    'unit-tests/maps-variables',
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

  return new Response(`# Using \`@clarigen/test\`

${mdChunks}
`);
}
