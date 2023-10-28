/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

/*
if (process.env.NODE_ENV === 'development') {
  const { setupDevBindings } = require('@cloudflare/next-on-pages/next-dev');

  setupDevBindings({
      r2Buckets: ['BUCKET'],
      kvNamespaces: ['KV'],
      d1Databases: {
        DB: "51df7813-6009-4ddc-b52a-46cbb755bddd"
      },
  });
}
*/
