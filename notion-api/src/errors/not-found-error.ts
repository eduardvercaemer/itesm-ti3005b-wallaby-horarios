import { Resource } from "../lib/resource.ts";

export class NotFoundError extends Error {
  public readonly resource: Resource;
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
    this.resource = resource;
  }
}
