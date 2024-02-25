import { Router } from "itty-router";
import { Core } from "./core.ts";

export const app = Router<Core>();

app.all("*", (c) => {
  console.debug(c.notion);
});

app.get("*", () => "OK");
