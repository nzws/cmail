import "@radix-ui/themes/styles.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./global.scss";

import type { Metadata } from "next";
import { ReactNode } from "react";

import { RootProviders } from "./components/provider";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "CMail",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
