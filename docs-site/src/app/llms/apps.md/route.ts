import { generateLlmTxt } from '@/lib/llm-txt';

export async function GET(_request: Request) {
  const slugs = [
    'apps/quick-start',
    'apps/read-only-functions',
    'apps/transactions',
    'apps/factory',
    'apps/deployments',
    'apps/post-conditions',
    'apps/node',
  ];

  return generateLlmTxt(slugs);
}
