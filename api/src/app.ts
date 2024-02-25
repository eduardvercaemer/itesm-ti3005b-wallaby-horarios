import { Router } from "itty-router";
import { Core } from "./core.ts";

export const app = Router<Core>();

app.get("*", (c) => c.d1.prepare("SELECT COUNT(*) AS COUNT FROM foo").first());
