import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/schema.ts",
  out: "./migrations",
  driver: "better-sqlite",
  dbCredentials: {
    // To use Drizzle Studio, edit this URL
    url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/673d4bdcb8bb66562fed028d2e2d1f4951fe34679fa5542249ae30c5ea00a15e.sqlite",
  },
} satisfies Config;
