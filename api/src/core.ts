import { json } from "itty-router";

import { Env } from "./env.ts";

export class Core {
  public readonly env!: Env;
  public readonly executionContext!: ExecutionContext;
  public readonly isWorker: boolean;
  public readonly method: string;
  public readonly url: string;
  public readonly route!: string;
  public readonly params!: Record<string, string | undefined>;
  public readonly query!: Record<string, string[] | string | undefined>;

  constructor(
    public readonly request: Request,
    env?: Env,
    executionContext?: ExecutionContext,
  ) {
    this.isWorker = this.executionContext !== undefined;
    if (env) this.env = env;
    if (executionContext) this.executionContext = executionContext;

    this.method = this.request.method;
    this.url = this.request.url;
  }

  then(response: unknown): Response {
    return json(response);
  }

  catch(error: unknown): Response {
    console.error(error);
    return new Response(null, { status: 500 });
  }

  finally() {
    console.debug(this);
  }
}
