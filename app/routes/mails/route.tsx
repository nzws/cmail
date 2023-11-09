import { Grid } from "@radix-ui/themes";
import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";

import { authorizationMiddleware } from "@/app/middleware/authorization.server";
import { getDB, getFolders } from "@/lib/db";

import { Folders } from "./components/folders";
import { Header } from "./components/header";
import styles from "./styles.module.css";

export { ErrorBoundary } from "../../components/error-boundary";

export async function loader({ request, context }: LoaderFunctionArgs) {
  await authorizationMiddleware(request, context.env);

  const db = getDB(context.env);
  const folders = await getFolders(db);

  return json(folders);
}

export default function Layout() {
  const folders = useLoaderData<typeof loader>();

  return (
    <Grid className={styles.container}>
      <div className={styles.header_container}>
        <Header />
      </div>

      <div className={styles.folders_container}>
        <Folders folders={folders} />
      </div>

      <Outlet />
    </Grid>
  );
}
