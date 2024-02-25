import { app } from "../app.ts";
import { datePlus } from "itty-time";
import { getClassDatabaseId } from "../lib/database.ts";

app.get("/schedule/:date", async (c) => {
  const dateString = c.params.date!;
  const start = new Date(dateString);
  const end = datePlus("1d", start);
  const databaseId = await getClassDatabaseId(c);

  return await c.notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Date",
          date: { on_or_after: start.toISOString().split("T")[0] },
        },
        {
          property: "Date",
          date: { on_or_before: end.toISOString().split("T")[0] },
        },
      ],
    },
  });
});
