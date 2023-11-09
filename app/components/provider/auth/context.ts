import { createContext, useContext } from "react";

interface Props {
  email: string;
}

export const AuthContext = createContext<Props | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Provider is not mounted");
  }

  return context;
};
