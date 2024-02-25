import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { api } from "~/routes/plugin@api";

export const useApi = routeLoader$(async (e): Promise<any> => {
  return await api(e).get("/schedule/2024-02-21");
});

export default component$(() => {
  const api = useApi();
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    console.log(api.value);
  });
  return <h1>index</h1>;
});

export const head: DocumentHead = {
  title: "Wallaby",
  meta: [
    {
      name: "description",
      content: "Wallaby helper site",
    },
  ],
};
