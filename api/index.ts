import { error, json, Router } from "itty-router";

export const app = Router();

app.get("*", () => "OK");

export default {
  fetch(request: Request) {
    return app.handle(request).then(json).catch(error);
  },
};
