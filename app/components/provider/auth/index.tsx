import { ReactNode } from "react";

import { AuthContext } from "./context";

interface Props {
  email: string;
  children: ReactNode;
}

export function AuthProvider({ email, children }: Props) {
  return (
    <AuthContext.Provider value={{ email }}>{children}</AuthContext.Provider>
  );
}
