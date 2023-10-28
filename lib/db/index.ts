import { drizzle } from "drizzle-orm/d1";

import * as schema from "../schema";

export const getDB = (env: NodeJS.ProcessEnv) =>
  drizzle(env.DATABASE, { schema });

export type Database = ReturnType<typeof getDB>;

export * from "./folder-rules";
export * from "./folders";
export * from "./mails";
