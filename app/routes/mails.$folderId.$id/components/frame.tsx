import styles from "./frame.module.css";

interface Props {
  id: string;
  allowExternalImages: boolean;
}

export function Frame({ id, allowExternalImages }: Props) {
  return (
    <iframe
      src={`/mails/_/${id}/embed?${
        allowExternalImages ? "allow_external_images=1" : ""
      }`}
      className={styles.frame}
      sandbox=""
    />
  );
}
