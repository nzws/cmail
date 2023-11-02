import styles from "./styles.module.css";

export function NotFoundImage() {
  return (
    <img
      src="https://static-cdn.nzws.me/not-found.png"
      alt="404 not found"
      className={styles.image}
    />
  );
}
