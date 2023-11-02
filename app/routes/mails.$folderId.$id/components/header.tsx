import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { Form } from "@remix-run/react";
import {
  ArrowRightIcon,
  FolderIcon,
  ForwardIcon,
  ReplyAllIcon,
  ReplyIcon,
  Trash2Icon,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";

import styles from "./header.module.css";

interface Props {
  sender?: string;
  date?: string;
  subject?: string;
  from?: string;
  to?: string;
}

export function Header({ sender, date, subject, from, to }: Props) {
  return (
    <Flex direction="column" width="100%" gap="1" className={styles.container}>
      <Flex justify="between" align="center">
        <Flex align="center" gap="5">
          <Button variant="ghost" size="4">
            <ReplyIcon size="24px" />
          </Button>

          <Button variant="ghost" size="4">
            <ReplyAllIcon size="24px" />
          </Button>

          <Button variant="ghost" size="4">
            <ForwardIcon size="24px" />
          </Button>
        </Flex>

        <Flex align="center" gap="5">
          <Button variant="ghost" size="4">
            <FolderIcon size="24px" />
          </Button>

          <Form replace method="post">
            <input type="hidden" name="action" value="delete" />
            <Button variant="ghost" size="4" type="submit">
              <Trash2Icon size="24px" />
            </Button>
          </Form>
        </Flex>
      </Flex>

      <Flex justify="between" align="center">
        <Text className="truncated" size="2">
          {sender ?? from ?? <Skeleton height="22px" width="300px" />}
        </Text>
        <Text size="2">{date ?? <Skeleton height="22px" width="150px" />}</Text>
      </Flex>
      <Heading size="4">
        {subject ?? <Skeleton height="26px" width="100%" />}
      </Heading>

      {!!(from && to) ? (
        <Flex align="center" gap="1" wrap="wrap">
          <Text size="2">{from}</Text>
          <ArrowRightIcon size="18px" />
          <Text size="2">{to}</Text>
        </Flex>
      ) : (
        <Skeleton height="22px" width="60%" />
      )}
    </Flex>
  );
}
