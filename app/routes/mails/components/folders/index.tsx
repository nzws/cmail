"use client";

import { Box, Button } from "@radix-ui/themes";
import { SerializeFrom } from "@remix-run/cloudflare";
import { Link, useParams } from "@remix-run/react";
import {
  ArchiveXIcon,
  FolderIcon,
  InboxIcon,
  MailPlus,
  SendIcon,
  Trash2Icon,
} from "lucide-react";
import { Fragment, ReactElement } from "react";
import Skeleton from "react-loading-skeleton";

import type { Folder, SystemFolderType } from "@/lib/schema";

import styles from "./styles.module.css";

interface Props {
  folders?: SerializeFrom<Folder>[];
}

const systemFolderIcon: { [key in SystemFolderType]: ReactElement } = {
  inbox: <InboxIcon size="20px" />,
  sent: <SendIcon size="20px" />,
  spam: <ArchiveXIcon size="20px" />,
  trash: <Trash2Icon size="20px" />,
};

const defaultFolderIcon = <FolderIcon size="20px" />;

export function Folders({ folders }: Props) {
  const params = useParams();

  return (
    <Box className={styles.container}>
      <Button size="3" radius="full" asChild className={styles.compose_button}>
        <Link to="/mails/new">
          <MailPlus />
          Compose
        </Link>
      </Button>

      <Box className={styles.folders}>
        {folders?.map((folder) => (
          <Button
            variant={
              params.folderId === folder.id || params.folderId === folder.system
                ? "solid"
                : "ghost"
            }
            size="3"
            radius="full"
            className={styles.folder_button}
            key={folder.id}
            asChild
          >
            <Link to={`/mails/${folder.id}`}>
              {folder.system
                ? systemFolderIcon[folder.system]
                : defaultFolderIcon}
              {folder.name}
            </Link>
          </Button>
        )) ?? (
          <Fragment>
            <Skeleton height="35px" borderRadius={0} />
            <Skeleton height="35px" borderRadius={0} />
            <Skeleton height="35px" borderRadius={0} />
          </Fragment>
        )}
      </Box>
    </Box>
  );
}
