import { inArray } from "drizzle-orm";

import { Database } from "../db";
import { r2MailAttachmentKey } from "../r2/keys";
import { mail, mailAttachment, mailEnvelope } from "../schema";

export const deleteMails = async (
  bucket: R2Bucket,
  db: Database,
  ids: string[],
) => {
  await db.delete(mailEnvelope).where(inArray(mailEnvelope.mailId, ids));
  await db.delete(mailAttachment).where(inArray(mailAttachment.mailId, ids));
  await db.delete(mail).where(inArray(mail.id, ids));

  await Promise.all(
    ids.map(async (id) => {
      const items = await bucket.list({
        prefix: r2MailAttachmentKey(id),
      });

      return bucket.delete(items.objects.map((item) => item.key));
    }),
  );
};
