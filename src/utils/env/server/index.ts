import { Type as t } from "@sinclair/typebox/type";
import { parse } from "~/utils/base";

const serverEnvSchema = t.Object({
  DATABASE_URL: t.String({
    minLength: 1,
    error: "DATABASE_URL server environment variable is not set!",
  }),
  SECRET: t.String({
    minLength: 1,
    error: "SECRET server environment variable is not set!",
  }),
  AUTH_COOKIE: t.Literal("user", { error: "AUTH_COOKIE not set!" }),
  SEVEN_DAYS: t.Integer({ minimum: 1, error: "SEVEN_DAYS not set!" }),
});

export const serverEnv = parse(serverEnvSchema, {
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET: process.env.SECRET,
  AUTH_COOKIE: "user",
  SEVEN_DAYS: 60 * 60 * 24 * 7, // 7 days in seconds
});
