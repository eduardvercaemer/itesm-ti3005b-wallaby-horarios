import { Core } from "../core.ts";
import { ConfigurationError } from "../errors/configuration-error.ts";
import { Settings } from "./settings.ts";

export const getDatabaseSetting =
  (setting: string) =>
  async (c: Core): Promise<string> => {
    const result = await c.d1
      .prepare(
        `SELECT value
       FROM setting
       WHERE name = ?`,
      )
      .bind(setting)
      .first();

    if (!result) {
      throw new ConfigurationError(setting);
    }

    return result.value as string;
  };

export const getClassDatabaseId = getDatabaseSetting(Settings.ClassDatabase);
