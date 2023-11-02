import { useEffect, useRef, useState } from "react";

import styles from "./frame.module.css";

interface Props {
  id: string;
  allowExternalImages: boolean;
}

export function Frame({ id, allowExternalImages }: Props) {
  const bodyRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const body = bodyRef.current;
    if (!body?.contentDocument) {
      return;
    }

    const handler = () => {
      const height = body.contentDocument?.body.clientHeight;
      setHeight(height ?? 0);
    };

    const resizeObserver = new ResizeObserver(handler);

    resizeObserver.observe(body.contentDocument.body);
    body.addEventListener("load", handler);

    return () => {
      resizeObserver.disconnect();
      body.removeEventListener("load", handler);
    };
  }, []);

  return (
    <iframe
      src={`/mails/_/${id}/embed?${
        allowExternalImages ? "allow_external_images=1" : ""
      }`}
      sandbox=""
      className={styles.frame}
      style={{
        height,
      }}
    />
  );
}
