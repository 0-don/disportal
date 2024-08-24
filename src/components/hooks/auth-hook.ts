import { createMutation } from "@tanstack/solid-query";
import { rpc } from "~/lib/rpc";
import { handleEden } from "~/utils/base";

export const AuthHook = () => {
  const registerMutation = createMutation(() => ({
    mutationFn: async (
      ...args: Parameters<typeof rpc.api.auth.register.post>
    ) => handleEden(await rpc.api.auth.register.post(...args)),
  }));

  const loginMutation = createMutation(() => ({
    mutationFn: async (...args: Parameters<typeof rpc.api.auth.login.post>) =>
      handleEden(await rpc.api.auth.login.post(...args)),
  }));

  const logoutMutation = createMutation(() => ({
    mutationFn: async () => handleEden(await rpc.api.auth.logout.get()),
  }));

  return {
    registerMutation,
    loginMutation,
    logoutMutation,
  };
};
