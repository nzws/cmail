declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        BUCKET: R2Bucket;
        DATABASE: D1Database;
        KV: KVNamespace;
      }
    }
  }
}
