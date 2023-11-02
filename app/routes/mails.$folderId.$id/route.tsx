import { Box } from "@radix-ui/themes";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Fragment } from "react";

import { getDB, getMail, getSystemFolder, moveMail } from "@/lib/db";
import { EnvelopeType, SystemFolderType } from "@/lib/schema";

import { Frame } from "./components/frame";
import { Header } from "./components/header";
import styles from "./styles.module.css";

export { ErrorBoundary } from "../../components/error-boundary";

export async function loader({ params, context }: LoaderFunctionArgs) {
  const db = getDB(context.env);
  const id = params.id;
  if (!id) {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const mail = await getMail(db, id);

  return json(mail);
}

export async function action({ request, params, context }: ActionFunctionArgs) {
  const id = params.id;
  if (!id) {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const body = await request.formData();
  const action = body.get("action");
  const db = getDB(context.env);

  switch (action) {
    case "delete":
      const trash = await getSystemFolder(db, SystemFolderType.Trash);
      await moveMail(db, id, trash.id);
      return redirect(`/mails/${params.folderId}`);
    default:
      throw new Response(null, {
        status: 400,
        statusText: "Bad Request",
      });
  }
}

export default function Page() {
  const mail = useLoaderData<typeof loader>();

  const from = mail.envelopes.find(
    (envelope) => envelope.type === EnvelopeType.From,
  );

  return (
    <div className={styles.container}>
      <Header
        sender={from ? from.name ?? from.address : mail.from}
        date={new Date(mail.createdAt).toLocaleString()}
        subject={mail.subject ?? ""}
        from={mail.from}
        to={mail.to}
      />

      <div className={styles.frame}>
        {mail.isHtml ? (
          <Frame id={mail.id} allowExternalImages={false} />
        ) : (
          <Box p="4">
            {mail.content.split("\n").map((line, i) => (
              <Fragment key={i}>
                {line}
                <br />
              </Fragment>
            ))}
          </Box>
        )}
      </div>
    </div>
  );
}
