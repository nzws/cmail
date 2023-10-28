import { notFound } from "next/navigation";

import { getFolder, getMails } from "@/lib/next/db-cache";

import { MailsPresentational } from "./presentational";

interface Props {
  folderId: string;
}

export async function Mails({ folderId }: Props) {
  const folder = await getFolder(folderId);
  if (!folder) {
    return notFound();
  }

  const mails = await getMails(folder.id);

  return <MailsPresentational mails={mails} folder={folder} />;
}
