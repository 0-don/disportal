import { getCookie } from "vinxi/http";
import { serverEnv } from "./env/server";

export const ssrCookies = () => {
  "use server";
  return {
    $headers: {
      cookie: [serverEnv.AUTH_COOKIE]
        .map((cookie) => `${cookie}=${getCookie(cookie)}`)
        .join("; "),
    },
  };
};
