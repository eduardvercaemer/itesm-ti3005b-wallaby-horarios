import {component$, useVisibleTask$} from "@builder.io/qwik";
import {DocumentHead, routeLoader$} from "@builder.io/qwik-city";
import {API} from "~/routes/plugin@api";

export const useApi = routeLoader$(async (e) => {
  const api = API(e)
  return await api.get("/schedule/2024-02-21") as any
})

export default component$(() => {
  const data = useApi()
  useVisibleTask$(() => {
    console.log(data.value)
  })
  return <h1>index</h1>;
});

// noinspection JSUnusedGlobalSymbols
export const head: DocumentHead = {
  title: "Wallaby",
  meta: [
    {
      name: "description",
      content: "Wallaby",
    },
  ],
};
