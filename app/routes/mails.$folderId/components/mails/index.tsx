import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { Link, useParams } from "@remix-run/react";
import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";

import type { Folder, Mail } from "@/lib/schema";

import styles from "./styles.module.css";

interface Props {
  mails?: Mail[];
  folder?: Folder;
}

export function MailsPresentational({ mails, folder }: Props) {
  const params = useParams();
  const folderId = params.folderId;

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        {folder ? (
          <Heading size="4">{folder.name}</Heading>
        ) : (
          <Skeleton height="26px" />
        )}
      </Box>

      {mails?.map((mail) => (
        <Button
          variant={params.id === mail.id ? "solid" : "ghost"}
          radius="none"
          size="2"
          className={styles.mail_button}
          asChild
          color={params.id === mail.id ? undefined : "gray"}
          key={mail.id}
        >
          <Link to={`/mails/${folderId}/${mail.id}`}>
            <Flex direction="column" width="100%">
              <Flex justify="between" align="center">
                <Text className="truncated" size="2">
                  {mail.from} {/* todo: 仮 */}
                </Text>
                <Text size="2">3 minutes ago</Text>
              </Flex>
              <Heading size="3" className="truncated">
                {mail.subject ?? "No subject"}
              </Heading>
            </Flex>
          </Link>
        </Button>
      )) ?? (
        <Fragment>
          <Skeleton height="65px" borderRadius={0} />
          <Skeleton height="65px" borderRadius={0} />
          <Skeleton height="65px" borderRadius={0} />
        </Fragment>
      )}
    </Box>
  );
}
