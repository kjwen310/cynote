import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useUserStore } from "./user";

export default function initUser({ user }: { user: User | undefined }) {
  const [hasInitUser, isHasInitUser] = useState(false);

  useEffect(() => {
    if (!hasInitUser) {
      useUserStore.setState({ user });
    }

    isHasInitUser(true);
  }, []);

  return <></>
}
