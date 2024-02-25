import { Core } from "../core.ts";
import { ConfigurationError } from "../errors/configuration-error.ts";
import { Settings } from "./settings.ts";
import { NotFoundError } from "../errors/not-found-error.ts";
import { Resource } from "./resource.ts";

export interface NotionUser {
  id: string;
  email: string | null;
  name: string | null;
  avatar: string | null;
}

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

export async function getNotionUserById(c: Core, userId: string) {
  const result = await c.d1
    .prepare(
      `SELECT id,
              email,
              name,
              avatar
       FROM notion_user
       WHERE id = ?`,
    )
    .bind(userId)
    .first<NotionUser>();

  if (!result) {
    throw new NotFoundError(Resource.NotionUser, { userId });
  }

  return result;
}

export async function upsertNotionUserById(
  c: Core,
  userId: string,
  user: NotionUser,
): Promise<NotionUser> {
  // TODO(XXX): handle id conflict
  await c.d1
    .prepare(
      `INSERT INTO notion_user
           (id, email, name, avatar)
       VALUES (?, ?, ?, ?)`,
    )
    .bind(userId, user.email, user.name, user.avatar)
    .run();

  return user;
}
