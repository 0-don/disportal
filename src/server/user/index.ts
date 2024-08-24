import type { User } from "@prisma/client";
import { Elysia, ParseError } from "elysia";
import { decrypt } from "~/lib/jwt";
import { serverEnv } from "~/utils/env/server";

export const userRoute = new Elysia({ prefix: "/user" }).get(
  "/me",
  async (ctx) => {
    const user = await decrypt<User>(ctx.cookie[serverEnv.AUTH_COOKIE].value);

    if (!user) throw new ParseError();

    return user;
  }
);
