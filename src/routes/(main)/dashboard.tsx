import { RouteDefinition, useNavigate } from "@solidjs/router";
import { UserHook } from "~/components/hooks/user-hook";
import { QueryBoundary } from "~/components/providers/query-boundary";
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
      <QueryBoundary
        query={meQuery}
        loadingFallback={<div class="loader">loading user...</div>}
        errorFallback={(err, retry) => (
          <div>
            <div class="error">{err.message}</div>
            <button onClick={() => retry()}>retry</button>
          </div>
        )}
      >
        {(user) => (
          <div>
            <p>{user.id}</p>
            <p>{user.username}</p>
          </div>
        )}
      </QueryBoundary>
    </div>
  );
}
