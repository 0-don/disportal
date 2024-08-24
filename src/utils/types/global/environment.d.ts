declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_HOST: string;
    POSTGRES_DB: string;
    DATABASE_URL: string;

    NODE_ENV: "development" | "production";
    SECRET: string;

    VITE_SITE_NAME: string;
    VITE_SITE_URL: string;
  }
}
