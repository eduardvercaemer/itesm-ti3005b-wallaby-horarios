import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { API } from "~/routes/plugin@api";
import { Datepicker } from "~/components/datepicker/datepicker";

export const useApi = routeLoader$(async (e) => {
  const api = API(e);
  return (await api.get("/schedule/2024-02-21")) as any;
});

export default component$(() => {
  return (
    <>
      <h1>index</h1>
      <Datepicker />
    </>
  );
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
