import { app } from "../app.ts";
import { getClassDatabaseId } from "../lib/database.ts";
import { getClassesForDate } from "../lib/notion.ts";

app.get("/schedule/:date", async (c) => {
  const date = c.params.date!;
  const classDatabaseId = await getClassDatabaseId(c);
  return await getClassesForDate(c, classDatabaseId, new Date(date));
});
