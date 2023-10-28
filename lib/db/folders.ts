import { eq } from "drizzle-orm";

import { folder, SystemFolderType } from "../schema";
import { Database } from ".";

const _createSystemFolders = async (db: Database) => {
  await db
    .insert(folder)
    .values([
      {
        id: crypto.randomUUID(),
        name: "Inbox",
        system: SystemFolderType.Inbox,
      },
      {
        id: crypto.randomUUID(),
        name: "Sent",
        system: SystemFolderType.Sent,
      },
      {
        id: crypto.randomUUID(),
        name: "Spam",
        system: SystemFolderType.Spam,
      },
      {
        id: crypto.randomUUID(),
        name: "Trash",
        system: SystemFolderType.Trash,
      },
    ])
    .onConflictDoNothing();
};

export const getSystemFolder = async (db: Database, type: SystemFolderType) => {
  const item = await db.query.folder.findFirst({
    where: eq(folder.system, type),
  });
  if (!item) {
    await _createSystemFolders(db);
    const item = await db.query.folder.findFirst({
      where: eq(folder.system, type),
    });
    if (!item) {
      throw new Error("Failed to create system folder");
    }
    return item;
  }
  return item;
};

export const getFolders = async (db: Database) => {
  return db.query.folder.findMany();
};

export const getFolder = async (
  db: Database,
  id: string | SystemFolderType,
) => {
  if (Object.values(SystemFolderType).includes(id as SystemFolderType)) {
    return getSystemFolder(db, id as SystemFolderType);
  }

  return await db.query.folder.findFirst({
    where: eq(folder.id, id),
  });
};
