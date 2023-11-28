import { CalloutRoot, CalloutText } from "@radix-ui/themes";

import styles from "./styles.module.css";

export function CalloutAutoClean() {
  return (
    <CalloutRoot className={styles.callout} color="iris">
      <CalloutText>
        Emails in this folder will be deleted after 30 days.
      </CalloutText>
    </CalloutRoot>
  );
}
