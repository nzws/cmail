import { Grid } from "@radix-ui/themes";

import { Folders } from "./components/folders";
import { Header } from "./components/header";
import styles from "./layout.module.scss";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Grid className={styles.container}>
      <div className={styles.header_container}>
        <Header />
      </div>

      <div className={styles.folders_container}>
        <Folders />
      </div>

      {children}
    </Grid>
  );
}
