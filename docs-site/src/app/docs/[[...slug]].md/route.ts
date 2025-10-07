import { allDocs } from 'contentlayer/generated';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.pathname.split('/').slice(2).join('/');
  const doc = allDocs.find(doc => doc.slugAsParams === slug);
  if (!doc) {
    return new Response('Not found', { status: 404 });
  }
  return new Response(doc.body.raw, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
