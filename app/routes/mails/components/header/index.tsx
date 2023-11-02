import {
  Avatar,
  Box,
  Heading,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import { SearchIcon } from "lucide-react";

import styles from "./styles.module.css";

export function Header() {
  return (
    <div className={styles.container}>
      <Box className={styles.brand_container}>
        <Heading size="6">CMail</Heading>
      </Box>

      <Box className={styles.search_container}>
        <TextFieldRoot>
          <TextFieldSlot>
            <SearchIcon />
          </TextFieldSlot>
          <TextFieldInput placeholder="Search emails..." width="100%" />
        </TextFieldRoot>
      </Box>

      <Box className={styles.avatar_container}>
        <Avatar
          radius="full"
          src="https://github.com/nzws.png"
          size="3"
          fallback="user"
        />
      </Box>
    </div>
  );
}
