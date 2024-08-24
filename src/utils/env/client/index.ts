import { Type as t } from "@sinclair/typebox/type";
import { parse } from "~/utils/base";

const clientEnvSchema = t.Object({
  SITE_URL: t.String({
    minLength: 1,
    error: "VITE_HOST_URL client environment variable is not set!",
  }),
  SITE_NAME: t.String({
    minLength: 1,
    error: "SITE_NAME client environment variable is not set!",
  }),

});

export const clientEnv = parse(clientEnvSchema, {
  SITE_URL: import.meta.env.VITE_SITE_URL,
  SITE_NAME: import.meta.env.VITE_SITE_NAME,

});
