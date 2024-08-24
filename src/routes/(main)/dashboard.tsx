import { RouteDefinition, useNavigate } from "@solidjs/router";
import { UserHook } from "~/components/hooks/user-hook";

import { rpc } from "~/lib/rpc";
import { ssrCookies } from "~/utils/server";

export const route = {
  async load({ location }) {
    const navigate = useNavigate();
    const me = await rpc.api.user.me.get(ssrCookies());

    if (me.error && !location.pathname.includes("logout"))
      navigate("/auth/login", { replace: true });
  },
} satisfies RouteDefinition;

export default function DashboardPage() {
  const { meQuery } = UserHook();
  return (
    <div>
      <div>
        <p>{meQuery.data.id}</p>
        <p>{meQuery.data.username}</p>
      </div>
    </div>
  );
}
