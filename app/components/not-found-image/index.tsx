import styles from "./styles.module.scss";

export function NotFoundImage() {
  return (
    <img
      src="https://static-cdn.nzws.me/not-found.png"
      alt="404 not found"
      className={styles.image}
    />
  );
}
