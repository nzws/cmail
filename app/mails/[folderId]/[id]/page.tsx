import { Box } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { getMail } from "@/lib/next/db-cache";
import { EnvelopeType } from "@/lib/schema";

import { Frame } from "./components/frame";
import { Header } from "./components/header";
import styles from "./styles.module.scss";

interface Props {
  params: {
    folderId: string;
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const mail = await getMail(params.id);
  if (!mail) {
    return notFound();
  }

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
          <Frame id={params.id} allowExternalImages={false} />
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
