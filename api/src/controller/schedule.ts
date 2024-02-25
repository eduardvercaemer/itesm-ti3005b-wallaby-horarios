import { app } from "../app.ts";
import { queryClassForRange, retrieveUserInformation } from "../lib/notion.ts";
import { getClassDatabaseId } from "../lib/database.ts";
import { mapAsync } from "../lib/util.ts";

app.get("/schedule/:date", async (c) => {
  const date = c.params.date!;
  const classDatabaseId = await getClassDatabaseId(c);
  const classes = await queryClassForRange(c, classDatabaseId, new Date(date));

  const employeeIds = classes.flatMap((c) => c.employee);

  return await mapAsync(
    employeeIds,
    async (employee) => await retrieveUserInformation(c, employee),
  );
});
