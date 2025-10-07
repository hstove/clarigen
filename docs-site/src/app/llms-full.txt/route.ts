import { generateLlmTxt } from '@/lib/llm-txt';

export async function GET(request: Request) {
  const slugs = [
    'getting-started',
    'intro',
    'cli',
    'configuration',
    'documentation',
    'unit-tests/quick-start',
    'unit-tests/example',
    'unit-tests/api',
    'unit-tests/maps-variables',
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
