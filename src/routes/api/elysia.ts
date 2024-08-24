import { Elysia } from "elysia";
import { authRoute } from "~/server/auth";
import { userRoute } from "~/server/user";

export const elysia = new Elysia({
  prefix: "/api",
  aot: false,
})
  .use(userRoute)
  .use(authRoute);

export type App = typeof elysia;
