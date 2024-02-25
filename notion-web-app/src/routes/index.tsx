import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { api } from "~/routes/plugin@api";

export const useApi = routeLoader$(async (e): Promise<any> => {
  return await api(e).get("/schedule/2024-02-21");
});

export default component$(() => {
  const api = useApi();
  const intl = new Intl.DateTimeFormat("MX", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Employees</th>
          </tr>
        </thead>
        <tbody>
          {api.value?.map((c: any) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{intl.format(new Date(c.date.start))}</td>
              <td>{intl.format(new Date(c.date.end))}</td>
              <td>{c.employees.map((e) => e.name).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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
