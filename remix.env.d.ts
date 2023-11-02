/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

import "@remix-run/server-runtime";

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext {
    env: NodeJS.ProcessEnv;
  }
}
