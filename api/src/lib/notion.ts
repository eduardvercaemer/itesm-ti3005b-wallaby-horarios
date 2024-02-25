import { Core } from "../core.ts";
import { getClassDatabaseId } from "./database.ts";
import { datePlus } from "itty-time";
import { z } from "zod";
import { NotionError } from "../errors/notion-error.ts";

export async function queryClassForRange(c: Core, date: Date) {
  const databaseId = await getClassDatabaseId(c);

  const response = await c.notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Date",
          date: { on_or_after: date.toISOString().split("T")[0] },
        },
        {
          property: "Date",
          date: {
            on_or_before: datePlus("1d", date).toISOString().split("T")[0],
          },
        },
      ],
    },
  });

  console.debug(JSON.stringify(response, null, 2));

  const parsed = await z
    .object({
      results: z.array(
        z
          .object({
            id: z.string().uuid(),
            url: z.string().url(),
            properties: z.object({
              Date: z.object({
                type: z.literal("date"),
                date: z.object({
                  start: z.string().transform((s) => new Date(s)),
                  end: z.string().transform((s) => new Date(s)),
                }),
              }),
              Employee: z.object({
                type: z.literal("people"),
                people: z.array(
                  z.object({
                    object: z.literal("user"),
                    id: z.string().uuid(),
                  }),
                ),
              }),
            }),
          })
          .transform((o) => ({
            id: o.id,
            url: o.url,
            date: o.properties.Date.date,
            employee: o.properties.Employee.people.map((p) => p.id),
          })),
      ),
    })
    .transform((response) => response.results)
    .safeParseAsync(response);
  if (parsed.success) {
    return parsed.data;
  }

  throw new NotionError(parsed.error.message, { cause: parsed.error });
}
