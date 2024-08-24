import { A, useNavigate } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { AuthHook } from "~/components/hooks/auth-hook";
import { authUser } from "~/lib/typebox/auth";

interface RegisterPageProps {}

export default function RegisterPage(props: RegisterPageProps) {
  const navigate = useNavigate();
  const [status, setStatus] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const { registerMutation } = AuthHook();

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    registerMutation
      .mutateAsync({
        username: username(),
        password: password(),
      })
      .then((user) =>
        user ? navigate("/dashboard", { replace: true }) : setStatus(user)
      )
      .catch((error) => setStatus(JSON.stringify(error)));
  };

  return (
    <form onSubmit={onSubmit} class="space-y-2">
      <div class="flex flex-col border">
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          value={username()}
          minLength={authUser.properties.username.minLength}
          maxLength={authUser.properties.username.maxLength}
          onInput={(e) => setUsername(e.currentTarget.value)}
          required
        />
      </div>
      <div class="flex flex-col border">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          value={password()}
          minLength={authUser.properties.password.minLength}
          maxLength={authUser.properties.password.maxLength}
          onInput={(e) => setPassword(e.currentTarget.value)}
          required
        />
      </div>
      <div class="flex justify-between">
        <button
          class="bg-red-600"
          type="submit"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Registering..." : "Register"}
        </button>

        <A href="/login">Login</A>
      </div>
      <Show when={status()}>
        <div>{registerMutation.error?.message}</div>
      </Show>
    </form>
  );
}
