import Skeleton from "react-loading-skeleton";

import { Header } from "./components/header";
import styles from "./styles.module.scss";

export default function Loading() {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.frame}>
        <Skeleton count={3} />
      </div>
    </div>
  );
}
