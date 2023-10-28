import { eq } from "drizzle-orm";

import { folderRule } from "../schema";
import { Database } from ".";

export const getRuleFromAddress = async (db: Database, address: string) => {
  return await db.query.folderRule.findFirst({
    where: eq(folderRule.value, address),
  });
};
