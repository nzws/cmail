import { getFolders } from "@/lib/next/db-cache";

import { FoldersPresentational } from "./presentational";

export async function Folders() {
  const folders = await getFolders();

  return <FoldersPresentational folders={folders} />;
}
