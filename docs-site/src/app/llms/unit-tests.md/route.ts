import { generateLlmTxt } from '@/lib/llm-txt';

export async function GET(request: Request) {
  const slugs = [
    'unit-tests/quick-start',
    'unit-tests/example',
    'unit-tests/api',
    'unit-tests/maps-variables',
  ];

  return generateLlmTxt(slugs);
}
