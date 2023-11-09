import { drizzle } from "drizzle-orm/d1";

import { Env } from "@/remix.env";

import * as schema from "../schema";

export const getDB = (env: Env) => drizzle(env.DATABASE, { schema });

export type Database = ReturnType<typeof getDB>;

export * from "./folder-rules";
export * from "./folders";
export * from "./mails";
