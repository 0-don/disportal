import { A } from "@solidjs/router";

export default function Home() {
  return (
    <main class="flex min-h-screen flex-col items-center p-24">
      <A href="/auth/login">Login</A>
      <A href="/auth/register">Register</A>
      <A href="/dashboard">Dashboard</A>
    </main>
  );
}
