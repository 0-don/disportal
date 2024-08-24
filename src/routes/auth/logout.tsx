import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import { AuthHook } from "~/components/hooks/auth-hook";

interface LogoutPageProps {}

export default function LogoutPage(props: LogoutPageProps) {
  const navigate = useNavigate();
  const { logoutMutation } = AuthHook();

  createEffect(() => {
    logoutMutation
      .mutateAsync()
      .then(() => {
        location.reload();
        setTimeout(() => navigate("/login", { replace: true }), 1000);
      })
      .catch((error) => console.error(error));
  });

  return <></>;
}
