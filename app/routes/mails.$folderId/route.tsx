import { Box } from "@radix-ui/themes";
import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Fragment } from "react";

import { getDB, getFolder, getMails } from "@/lib/db";

import { MailsPresentational } from "./components/mails";
import styles from "./styles.module.css";

export { ErrorBoundary } from "../../components/error-boundary";

export async function loader({ params, context }: LoaderFunctionArgs) {
  const db = getDB(context.env);
  const folderId = params.folderId;
  if (!folderId) {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const folder = await getFolder(db, folderId);
  if (!folder) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const mails = await getMails(db, folder.id);

  return json({
    folder,
    mails,
  });
}

export default function Page() {
  const { folder, mails } = useLoaderData<typeof loader>();

  return (
    <Fragment>
      <Box className={styles.mails}>
        <MailsPresentational mails={mails} folder={folder} />
      </Box>

      <Outlet />
    </Fragment>
  );
}
