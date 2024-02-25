import { app } from "../app.ts";

app.get("*", () => new Response(null, { status: 404 }));
app.all("*", () => new Response(null, { status: 405 }));
