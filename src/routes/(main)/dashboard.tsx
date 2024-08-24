import { RouteDefinition, useNavigate } from "@solidjs/router";
import { UserHook } from "~/components/hooks/user-hook";
import { rpc } from "~/lib/rpc";

export const route = {
  async load({ location }) {
    const navigate = useNavigate();
    const me = await rpc.api.user.me.get();
    if (me.error) navigate("/auth/login", { replace: true });
  },
} satisfies RouteDefinition;

export default function DashboardPage() {
  const { meQuery } = UserHook();
  return <>{meQuery.data?.username}</>;
}
