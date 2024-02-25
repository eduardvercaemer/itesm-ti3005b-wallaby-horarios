import { Resource } from "../lib/resource.ts";

export class NotFoundError extends Error {
  constructor(
    resource: Resource,
    meta?: Record<string, any>,
    options?: ErrorOptions,
  ) {
    super(
      `Could not find <${resource}>` + meta ? ": " + JSON.stringify(meta) : "",
      options,
    );
    this.name = NotFoundError.name;
  }
}
