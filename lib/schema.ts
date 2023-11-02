import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const mail = sqliteTable(
  "mail",
  {
    id: text("id").primaryKey().notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    from: text("from").notNull(),
    to: text("to").notNull(),
    subject: text("subject"),
    content: text("content").notNull(),
    isHtml: integer("is_html", { mode: "boolean" }),
    folderId: text("folder_id")
      .references(() => folder.id)
      .notNull(),
    messageId: text("message_id").notNull(),
    headers: text("headers", { mode: "json" })
      .$type<Record<string, string>>()
      .notNull(),
  },
  (table) => ({
    folderIdCreatedAtIndex: index("folder_id_created_at_index").on(
      table.folderId,
      table.createdAt,
    ),
  }),
);

export type Mail = typeof mail.$inferSelect;

export enum EnvelopeType {
  From = "from",
  To = "to",
  Cc = "cc",
  Bcc = "bcc",
  ReplyTo = "reply_to",
}

export const mailEnvelope = sqliteTable(
  "mail_envelope",
  {
    mailId: text("mail_id")
      .references(() => mail.id)
      .notNull(),
    type: text("type").notNull().$type<EnvelopeType>(),
    address: text("address").notNull(),
    name: text("name"),
  },
  (table) => ({
    pk: primaryKey(table.mailId, table.type, table.address),
  }),
);

export type MailEnvelope = typeof mailEnvelope.$inferSelect;

export enum MailAttachmentDisposition {
  Attachment = "attachment",
  Inline = "inline",
}

export const mailAttachment = sqliteTable(
  "mail_attachment",
  {
    mailId: text("mail_id")
      .references(() => mail.id)
      .notNull(),
    filename: text("filename").notNull(),
    mimeType: text("mime_type").notNull(),
    disposition: text("disposition").$type<MailAttachmentDisposition>(),
  },
  (table) => ({
    pk: primaryKey(table.mailId, table.filename),
  }),
);

export type MailAttachment = typeof mailAttachment.$inferSelect;

export enum SystemFolderType {
  Inbox = "inbox",
  Sent = "sent",
  Spam = "spam",
  Trash = "trash",
}

export const folder = sqliteTable("folder", {
  id: text("id").primaryKey().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  name: text("name").notNull(),
  system: text("system").$type<SystemFolderType>().unique(),
});

export type Folder = typeof folder.$inferSelect;

export const folderRule = sqliteTable("folder_rule", {
  id: text("id").primaryKey().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  folderId: text("folder_id")
    .references(() => folder.id)
    .notNull(),
  value: text("value").notNull(),
});

export type FolderRule = typeof folderRule.$inferSelect;

export const mailRelation = relations(mail, ({ many, one }) => ({
  envelopes: many(mailEnvelope),
  attachments: many(mailAttachment),
  folder: one(folder, {
    fields: [mail.folderId],
    references: [folder.id],
  }),
}));

export const mailEnvelopeRelation = relations(mailEnvelope, ({ one }) => ({
  mail: one(mail, {
    fields: [mailEnvelope.mailId],
    references: [mail.id],
  }),
}));

export const mailAttachmentRelation = relations(mailAttachment, ({ one }) => ({
  mail: one(mail, {
    fields: [mailAttachment.mailId],
    references: [mail.id],
  }),
}));

export const folderRelation = relations(folder, ({ many }) => ({
  mails: many(mail),
  rules: many(folderRule),
}));

export const folderRuleRelation = relations(folderRule, ({ one }) => ({
  folder: one(folder, {
    fields: [folderRule.folderId],
    references: [folder.id],
  }),
}));
