export class ConfigurationError extends Error {
  constructor(settingName: string, options?: ErrorOptions) {
    super(`Configuration error: missing setting "${settingName}"`, options);
    this.name = ConfigurationError.name;
  }
}
