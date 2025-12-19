/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import * as TanstackQuery from './integrations/tanstack-query/root-provider';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => (
      <TanstackQuery.Provider {...rqContext}>
        <NuqsAdapter>{props.children}</NuqsAdapter>
      </TanstackQuery.Provider>
    ),
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient,
  });

  return router;
};
