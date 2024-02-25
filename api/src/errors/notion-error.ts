export class NotionError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = NotionError.name;
  }
}
