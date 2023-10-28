"use client";

import { Theme } from "@radix-ui/themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function RootProviders({ children }: Props) {
  return (
    <Theme accentColor="tomato" radius="large" scaling="110%">
      {children}
    </Theme>
  );
}
