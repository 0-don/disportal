import { createQuery } from "@tanstack/solid-query";
import { rpc } from "~/lib/rpc";
import { handleEden } from "~/utils/base";

export const UserHook = () => {
  const meQuery = createQuery(() => ({
    queryKey: ["me"],
    queryFn: async () => handleEden(await rpc.api.user.me.get()),
    deferStream: true,
  }));

  return {
    meQuery,
  };
};
