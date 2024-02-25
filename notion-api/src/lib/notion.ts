import { datePlus } from "itty-time";
import { z } from "zod";

import { Core } from "../core.ts";
import { NotionError } from "../errors/notion-error.ts";
import { NotFoundError } from "../errors/not-found-error.ts";

import {
  getNotionUserById,
  NotionUser,
  upsertNotionUserById,
} from "./database.ts";
import { Resource } from "./resource.ts";
import { mapAsync } from "./util.ts";

/**
 * LOW LEVEL FUNCTIONS ONLY DEAL WITH CALLING THE API AND PARSING RESPONSES
 */
const LOW_LEVEL = {
  async fetchUserInformation(c: Core, userId: string): Promise<NotionUser> {
    console.debug("FETCHING USER INFO FOR", userId);
    const response = await c.notion.users.retrieve({ user_id: userId });

    const parsed = await z
      .object({
        object: z.literal("user"),
        type: z.literal("person"),
        id: z.string().uuid(),
        name: z.string(),
        avatar_url: z.string().url().nullable(),
        person: z.object({ email: z.string().email() }),
      })
      .transform((u) => ({
        id: u.id,
        name: u.name,
        email: u.person.email,
        avatar: u.avatar_url,
      }))
      .safeParseAsync(response);

    if (!parsed.success) {
      throw new NotionError(parsed.error.message, { cause: parsed.error });
    }

    return parsed.data;
  },
  async fetchClassForRange(c: Core, databaseId: string, date: Date) {
    console.debug("FETCHING CLASSES FOR", databaseId, date);
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
                Name: z.object({
                  id: z.literal("title"),
                  type: z.literal("title"),
                  title: z.array(z.any({})).transform((a) => a[0].plain_text),
                }),
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
              title: o.properties.Name.title,
              url: o.url,
              date: o.properties.Date.date,
              employees: o.properties.Employee.people.map((p) => p.id),
            })),
        ),
      })
      .transform((response) => response.results)
      .safeParseAsync(response);

    if (!parsed.success) {
      throw new NotionError(parsed.error.message, { cause: parsed.error });
    }

    return parsed.data;
  },
};

/**
 * Fetch user information from the database, or upsert from api if not found
 */
export async function getUserInformation(
  c: Core,
  userId: string,
): Promise<NotionUser> {
  console.debug("GETTING USER INFO FOR", userId);
  try {
    return await getNotionUserById(c, userId);
  } catch (e: unknown) {
    if (!(e instanceof NotFoundError) || e.resource !== Resource.NotionUser) {
      throw e;
    }
  }

  console.debug("NOT FOUND IN DATABASE", userId);
  const user = await LOW_LEVEL.fetchUserInformation(c, userId);
  return await upsertNotionUserById(c, userId, user);
}

export async function getClassesForDate(
  c: Core,
  databaseId: string,
  date: Date,
) {
  const classes = await LOW_LEVEL.fetchClassForRange(c, databaseId, date);
  return await mapAsync(classes, async (i) => ({
    ...i,
    employees: await mapAsync(i.employees, (e) => getUserInformation(c, e)),
  }));
}
