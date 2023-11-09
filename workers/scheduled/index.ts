import { getDB } from "@/lib/db";
import { Env } from "@/remix.env";

import {
  deleteSpamMails,
  deleteTrashMails,
} from "./actions/delete-outdated-mails";

export const scheduled: ExportedHandlerScheduledHandler<Env> = async (
  event,
  env,
) => {
  const db = getDB(env);

  switch (event.cron) {
    // 毎日 00:00
    case "0 0 * * *":
      await Promise.all([
        deleteTrashMails(env.BUCKET, db),
        deleteSpamMails(env.BUCKET, db),
      ]);
      break;
  }
};
