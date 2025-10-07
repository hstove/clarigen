export const revalidate = 3600; // 1 hour

export async function GET(request: Request) {
  const slugs = ['reference/types.md', 'reference/functions.md', 'reference/keywords.md'];

  const docs = await Promise.all(
    slugs.map(async slug => {
      const doc = await fetch(
        `https://raw.githubusercontent.com/stacks-network/docs/refs/heads/master/${slug}`
      );

      return doc.text();
    })
  );

  return new Response(
    `# Clarity Language Reference

Clarity is a smart contract language for the Stacks blockchain.

${docs.join('\n\n')}
    `,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    }
  );
}
