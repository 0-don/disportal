import {
  RouteDefinition,
  RouteSectionProps,
  useNavigate,
} from "@solidjs/router";
import { rpc } from "~/lib/rpc";
import { clientEnv } from "~/utils/env/client";

export const route = {
  async load({ location }) {
    const navigate = useNavigate();
    const me = await rpc.api.user.me.get();

    if (!me.error) navigate("/dashboard", { replace: true });
  },
} satisfies RouteDefinition;

export default function (props: RouteSectionProps) {
  return (
    <main class="flex h-screen">
      <section class="m-auto w-full max-w-[500px] p-5">
        {props.children}

        <footer class="mt-3 text-center text-xs">
          <p>
            {clientEnv.SITE_NAME} © 2024-{new Date().getFullYear()}
          </p>
        </footer>
      </section>
    </main>
  );
}
