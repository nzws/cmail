export const r2MailAttachmentKey = (mailId: string, filename?: string) =>
  `mail-attachments/${mailId}/${filename ?? ""}`;
