import {component$, useContext, useVisibleTask$} from "@builder.io/qwik";
import {
  DocumentHead,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import {API} from "~/routes/plugin@api";
import {DateContext} from "~/context/date.context";

export const useApi = routeAction$(
  async ({date}, e) => {
    const api = API(e);
    return (await api.get("/schedule/" + date)) as Class[];
  },
  zod$({
    date: z.string(),
  }),
);

export interface Person {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
}

export interface Class {
  id: string;
  title: string;
  url: string;
  employees: Person[];
  date: {
    start: string;
    end: string;
  };
}

export default component$(() => {
  const intl = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = useContext(DateContext);
  const api = useApi();
  useVisibleTask$(async ({track}) => {
    track(() => date.value);

    if (!date.value) {
      return;
    }

    if (!api.isRunning) {
      // date to format yyyy-mm-dd
      await api.submit({date: date.value.toISOString().split("T")[0]});
      console.debug(api.value);
    }
  });

  return (
    <>
      {api.value && (
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
            <tr>
              <th>Class Name</th>
              <th>Start</th>
              <th>End</th>
              <th>Employees</th>
            </tr>
            </thead>
            <tbody>
            {api.value.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{intl.format(new Date(item.date.start))}</td>
                <td>{intl.format(new Date(item.date.end))}</td>
                <td>
                  {item.employees.map(e => (
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img src={e.avatar} alt="Avatar"/>
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">{e.name}</div>
                        <div class="text-sm opacity-50">{e.email}</div>
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
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
