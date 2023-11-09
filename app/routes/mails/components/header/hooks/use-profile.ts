import { useEffect, useState } from "react";

import { useAuthContext } from "@/app/components/provider/auth/context";
import { getGravatarUrl } from "@/lib/gravatar";

export const useProfile = () => {
  const { email } = useAuthContext();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    void getGravatarUrl(email).then(setAvatarUrl);
  }, [email]);

  return {
    email,
    avatarUrl,
  };
};
