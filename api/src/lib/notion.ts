import { Core } from "../core.ts";
import { datePlus } from "itty-time";
import { z } from "zod";
import { NotionError } from "../errors/notion-error.ts";

export async function retrieveUserInformation(c: Core, userId: string) {
  const response = await c.notion.users.retrieve({ user_id: userId });
  console.debug(response);

  const parsed = await z
    .object({
      object: z.literal("user"),
      type: z.literal("person"),
      id: z.string().uuid(),
      name: z.string(),
      avatar_url: z.string().url(),
      person: z.object({ email: z.string().email() }),
    })
    .transform((u) => ({
      id: u.id,
      name: u.name,
      email: u.person.email,
      avatar: u.avatar_url,
    }))
    .safeParseAsync(response);

  if (parsed.success) {
    return parsed.data;
  }

  throw new NotionError(parsed.error.message, { cause: parsed.error });
}

export async function queryClassForRange(
  c: Core,
  databaseId: string,
  date: Date,
) {
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
