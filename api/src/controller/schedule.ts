import { app } from "../app.ts";
import { queryClassForRange } from "../lib/notion.ts";

app.get("/schedule/:date", async (c) => {
  const date = c.params.date!;
  return await queryClassForRange(c, new Date(date));
});
