import { Core } from "../core.ts";
import { getClassDatabaseId } from "./database.ts";
import { datePlus } from "itty-time";

export async function queryClassForRange(c: Core, date: Date) {
  const databaseId = await getClassDatabaseId(c);

  return await c.notion.databases.query({
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
}
