import { json } from "itty-router";
import { Client as NotionClient } from "@notionhq/client";

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
  public readonly notion: NotionClient;
  public readonly d1: D1Database;

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

    this.notion = new NotionClient({ auth: this.env.NOTION_KEY });

    this.d1 = this.env.D1;
  }

  then(response: unknown): Response {
    return json(response);
  }

  catch(error: unknown): Response {
    console.error(error);
    return new Response(null, { status: 500 });
  }

  finally() {}
}
