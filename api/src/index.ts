import { Core } from "./core.ts";
import { Env } from "./env.ts";
import { app } from "./app.ts";

import "./controller/setting.ts";

// noinspection JSUnusedGlobalSymbols
export default {
  fetch(request: Request, env?: Env, executionContext?: ExecutionContext) {
    const core = new Core(request, env, executionContext);
    return app
      .handle(core)
      .then(core.then.bind(core))
      .catch(core.catch.bind(core))
      .finally(core.finally.bind(core));
  },
};
