import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";

export const Website = Cloudflare.Website.Vite("Website", {
  compatibility: {
    flags: ["nodejs_compat", "global_fetch_strictly_public"],
  },
  assets: {
    runWorkerFirst: true,
  },
});

export default Alchemy.Stack(
  "clarigen-tools",
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const website = yield* Website;

    return {
      url: website.url.as<string>(),
    };
  }),
);
