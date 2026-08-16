import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";

export const Website = Cloudflare.Website.Vite("Website", {
  name: "clarigen-web-tools-website-hank",
  compatibility: {
    flags: ["nodejs_compat", "global_fetch_strictly_public"],
  },
});

export default Alchemy.Stack(
  "clarigen-web-tools",
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
