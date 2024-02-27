import { RequestEventCommon, RequestHandler } from "@builder.io/qwik-city";
import { PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { fetcher, FetcherType } from "itty-fetcher";

/**
 * Use service binding on cloudflare pages.
 * Use local api fetcher when running locally.
 */
export const onRequest: RequestHandler<PlatformCloudflarePages> = (c) => {
  const binding: Fetcher | null = c.platform.env?.API ?? null;
  if (binding) {
    c.sharedMap.set(
      "API",
      fetcher({
        base: "http://api",
        fetch(input, init) {
          if (input instanceof URL) {
            return binding.fetch(input.toString(), init);
          } else {
            return binding.fetch(input, init);
          }
        },
      }),
    );
  } else {
    console.warn("USING LOCALHOST API");
    c.sharedMap.set(
      "API",
      fetcher({
        base: "http://127.0.0.1:8787",
      }),
    );
  }
};

export function API(event: RequestEventCommon): FetcherType {
  return event.sharedMap.get("API") as FetcherType;
}
