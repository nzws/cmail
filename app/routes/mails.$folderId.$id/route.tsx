import { Box } from "@radix-ui/themes";
import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Fragment } from "react";

import { getDB, getMail } from "@/lib/db";
import { EnvelopeType } from "@/lib/schema";

import { Frame } from "./components/frame";
import { Header } from "./components/header";
import styles from "./styles.module.css";

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

export default function Page() {
  const mail = useLoaderData<typeof loader>();

  const from = mail.envelopes.find(
    (envelope) => envelope.type === EnvelopeType.From,
  );

  return (
    <div className={styles.container}>
      <Header
        sender={from ? from.name ?? from.address : mail.from}
        date="3 minutes ago"
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
