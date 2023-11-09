/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

import "@remix-run/server-runtime";

export interface Env {
  BUCKET: R2Bucket;
  DATABASE: D1Database;
  KV: KVNamespace;
  DISABLE_AUTH?: string;
  ACCESS_POLICY_AUD?: string;
  ACCESS_TEAM_SLUG?: string;
}

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext {
    env: Env;
  }
}
