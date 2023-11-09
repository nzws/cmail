declare module "postal-mime" {
  // https://github.com/postalsys/postal-mime/blob/511ed3f9331d722e656d99abcc80d7f9f3cff89b/postal-mime.d.ts
  export type RawEmail = string | ArrayBuffer | Blob | Buffer;

  export type Header = Record<string, string>;

  export interface Address {
    address: string;
    name: string;
  }

  export interface Attachment {
    filename: string;
    mimeType: string;
    disposition: "attachment" | "inline" | null;
    related?: boolean;
    contentId?: string;
    content: ArrayBuffer;
  }

  export interface Email {
    headers: Header[];
    from: Address;
    sender?: Address;
    replyTo?: Address[];
    deliveredTo?: string;
    returnPath?: string;
    to: Address[];
    cc?: Address[];
    bcc?: Address[];
    subject?: string;
    messageId: string;
    inReplyTo?: string;
    references?: string;
    date?: string;
    html?: string;
    text?: string;
    attachments: Attachment[];
  }

  export default class PostalMime {
    parse(email: RawEmail): Promise<Email>;
  }
}
