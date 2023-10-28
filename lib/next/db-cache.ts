import "server-only";

import { cache } from "react";

import * as database from "../db";

export const db = database.getDB(process.env);

export const getFolders = cache(() => database.getFolders(db));
export const getFolder = cache((id: string) => database.getFolder(db, id));
export const getMails = cache((folderId: string) =>
  database.getMails(db, folderId),
);
export const getMail = cache((id: string) => database.getMail(db, id));
