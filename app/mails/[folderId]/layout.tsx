import { Box } from "@radix-ui/themes";
import { Fragment } from "react";

import { Mails } from "./components/mails";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  params: { folderId: string };
}

export default function Layout({ children, params }: Props) {
  return (
    <Fragment>
      <Box className={styles.mails}>
        <Mails folderId={params.folderId} />
      </Box>
      {children}
    </Fragment>
  );
}
