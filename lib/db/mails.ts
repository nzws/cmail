import { desc, eq } from "drizzle-orm";

import { mail } from "../schema";
import { Database } from ".";

export const getMails = async (db: Database, folderId: string) => {
  return db.query.mail.findMany({
    where: eq(mail.folderId, folderId),
    orderBy: [desc(mail.createdAt)],
  });
};

export const getMail = async (db: Database, id: string) => {
  return await db.query.mail.findFirst({
    where: eq(mail.id, id),
    with: {
      envelopes: true,
      attachments: true,
    },
  });
};
