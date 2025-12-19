import { allExamples } from 'contentlayer/generated';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl.href);
  const doc = allExamples.find((ex) => ex.slug === '/examples/llms-txt');

  if (!doc) {
    throw new Error('LLMS TXT example not found');
  }

  // replace (/llms*) with (${url}/llms*)
  const withFullUrls = doc.body.raw.replace(
    /(\/llms.*?)/g,
    (match) => `${url.origin}${match}`
  );

  return new Response(withFullUrls, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
