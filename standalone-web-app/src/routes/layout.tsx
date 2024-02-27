import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { Navbar } from "~/components/navigation/navbar";

// noinspection JSUnusedGlobalSymbols
export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({ noCache: true });
};

export default component$(() => {
  return (
    <>
      <Navbar />
      <main>
        <Slot />
      </main>
    </>
  );
});
