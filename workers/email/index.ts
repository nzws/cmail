import PostalMime, { Address } from "postal-mime";

import { getDB, getRuleFromAddress, getSystemFolder } from "@/lib/db";
import { r2MailAttachmentKey } from "@/lib/r2/keys";
import {
  EnvelopeType,
  mail,
  mailAttachment,
  MailAttachmentDisposition,
  mailEnvelope,
  SystemFolderType,
} from "@/lib/schema";

const parser = new PostalMime();

const handleAddress = (
  id: string,
  type: EnvelopeType,
  addresses: Address[] | undefined,
) => {
  if (!addresses) {
    return [];
  }

  return addresses.map((address) => ({
    mailId: id,
    type,
    address: address.address,
    name: address.name,
  }));
};

export const email: EmailExportedHandler<NodeJS.ProcessEnv> = async (
  message,
  env,
) => {
  const db = getDB(env);
  const arrayBuffer = await new Response(message.raw).arrayBuffer();
  const data = await parser.parse(arrayBuffer);

  const id = crypto.randomUUID();

  const headers = data.headers.reduce<Record<string, string>>(
    (acc, header) => ({ ...acc, [header.key]: header.value }),
    {},
  );

  let folderId = (await getRuleFromAddress(db, message.from))?.folderId;
  if (!folderId) {
    // todo: もう少しまともにする
    const texts = ["spf=fail", "dkim=fail", "dmarc=fail"];
    const result = headers["authentication-results"].toLowerCase();
    const maybeSpam = texts.some((text) => result.includes(text));

    folderId = (
      await getSystemFolder(
        db,
        maybeSpam ? SystemFolderType.Spam : SystemFolderType.Inbox,
      )
    ).id;
  }

  const content = data.html ?? data.text;
  if (!content) {
    throw new Error("content is not found");
  }

  await db.insert(mail).values({
    id,
    from: message.from,
    to: message.to,
    subject: data.subject,
    content: content,
    isHtml: !!data.html,
    messageId: data.messageId,
    headers,
    folderId,
  });

  await db
    .insert(mailEnvelope)
    .values([
      ...handleAddress(id, EnvelopeType.From, [data.from]),
      ...handleAddress(id, EnvelopeType.To, data.to),
      ...handleAddress(id, EnvelopeType.Cc, data.cc),
      ...handleAddress(id, EnvelopeType.Bcc, data.bcc),
      ...handleAddress(id, EnvelopeType.ReplyTo, data.replyTo),
    ]);

  if (data.attachments.length > 0) {
    await db.insert(mailAttachment).values(
      data.attachments.map((attachment) => ({
        mailId: id,
        filename: attachment.filename,
        mimeType: attachment.mimeType,
        disposition: attachment.disposition as MailAttachmentDisposition | null,
      })),
    );
  }

  await Promise.all(
    data.attachments.map((attachment) => {
      const content = attachment.content as unknown as ArrayBuffer;

      return env.BUCKET.put(
        r2MailAttachmentKey(id, attachment.filename),
        content,
      );
    }),
  );
};
