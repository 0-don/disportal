import { edenTreaty } from "@elysiajs/eden";
import { App } from "~/routes/api/elysia";

export const rpc = edenTreaty<App>(
  typeof window === "undefined"
    ? `http://localhost:${process.env.PORT ?? 3000}`
    : window.location.origin
);
