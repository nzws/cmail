import { faker } from "@faker-js/faker";
import database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { readdir } from "fs/promises";
import path from "path";

import { Database, getSystemFolder } from "@/lib/db";
import {
  EnvelopeType,
  mail,
  mailEnvelope,
  SystemFolderType,
} from "@/lib/schema";
import * as schema from "@/lib/schema";

const searchSqliteFile = async () => {
  const directory = path.resolve(
    process.cwd(),
    ".wrangler/state/v3/d1/miniflare-D1DatabaseObject",
  );
  const files = await readdir(directory);
  const file = files.find((file) => file.endsWith(".sqlite"));
  if (!file) {
    throw new Error("No sqlite file found");
  }

  return path.resolve(directory, file);
};

const main = async (id: string, isHtml = false) => {
  const sqliteFile = await searchSqliteFile();
  const sqlite = new database(sqliteFile);
  const db = drizzle(sqlite, { schema }) as unknown as Database;

  const inbox = await getSystemFolder(db, SystemFolderType.Inbox);

  const from = faker.internet.email({ provider: "example.nzws.me" });
  const to = "i@nzws.me";

  await db.insert(mail).values({
    id,
    from,
    to,
    subject: faker.lorem.text(),
    content: isHtml
      ? `<h1>${faker.lorem.text()}</h1><p>${faker.lorem.paragraphs(
          { min: 2, max: 10 },
          "<br/>",
        )}</p>`
      : faker.lorem.paragraphs({ min: 2, max: 10 }),
    isHtml,
    messageId: id,
    headers: {},
    folderId: inbox.id,
  });

  await db.insert(mailEnvelope).values([
    {
      mailId: id,
      type: EnvelopeType.From,
      address: from,
      name: faker.person.fullName(),
    },
    {
      mailId: id,
      type: EnvelopeType.To,
      address: to,
      name: "nzws",
    },
  ]);
};

void main(crypto.randomUUID());
void main(crypto.randomUUID(), true);
