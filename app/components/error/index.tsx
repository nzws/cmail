import { Flex, Heading } from "@radix-ui/themes";

import styles from "./styles.module.css";

interface Props {
  message?: string;
}

export function ErrorMessage({ message }: Props) {
  return (
    <Flex
      gap="4"
      justify="center"
      align="center"
      direction="column"
      height="100%"
      width="100%"
    >
      <img
        // todo: replace to local image
        src="https://static-cdn.nzws.me/not-found.png"
        alt={message}
        className={styles.image}
      />
      {!!message && <Heading className={styles.message}>{message}</Heading>}
    </Flex>
  );
}
