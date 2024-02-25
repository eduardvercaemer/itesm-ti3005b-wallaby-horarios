import { Code } from "../util.ts";
import { app } from "../app.ts";

app.get("/setting", async (c) => {
  return c.d1
    .prepare(
      `SELECT name, value
       FROM setting
       ORDER BY name`,
    )
    .all();
});
app.get("/setting/:name", async (c) => {
  return c.d1
    .prepare(
      `SELECT name, value
       FROM setting
       WHERE name = ?`,
    )
    .bind(c.params.name!)
    .first();
});

app.put("/setting/:name/:value", async (c) => {
  await c.d1
    .prepare(
      `INSERT INTO setting (name, value)
       VALUES (?, ?)`,
    )
    .bind(c.params.name!, c.params.value!)
    .run();
  return Code.OK;
});

app.delete("/setting/:name", async (c) => {
  await c.d1
    .prepare(
      `DELETE
       FROM setting
       WHERE name = ?`,
    )
    .bind(c.params.name!)
    .run();
  return Code.OK;
});
