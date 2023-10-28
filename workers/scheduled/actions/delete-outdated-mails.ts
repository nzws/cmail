import { and, sql } from "drizzle-orm";

import { Database, getSystemFolder } from "@/lib/db";
import { SystemFolderType } from "@/lib/schema";
import { deleteMails } from "@/lib/services/delete-mails";

const deleteOutdatedMails = async (
  bucket: R2Bucket,
  db: Database,
  type: SystemFolderType,
) => {
  const trashFolder = await getSystemFolder(db, type);

  // updatedAt から30日以上経過したメールを削除する
  const outdated = new Date();
  outdated.setDate(outdated.getDate() - 30);

  const timestamp = Math.floor(outdated.getTime() / 1000);

  const mails = await db.query.mail.findMany({
    where: and(
      sql`folder_id = ${trashFolder.id}`,
      sql`updated_at <= ${timestamp}`,
    ),
  });
  const ids = mails.map((m) => m.id);

  await deleteMails(bucket, db, ids);
};

export const deleteTrashMails = (bucket: R2Bucket, db: Database) =>
  deleteOutdatedMails(bucket, db, SystemFolderType.Trash);

export const deleteSpamMails = (bucket: R2Bucket, db: Database) =>
  deleteOutdatedMails(bucket, db, SystemFolderType.Spam);
