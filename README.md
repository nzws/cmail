# CMail

Super (experimental) simple email service using Cloudflare products.

## Features

### Cloudflare の無料アカウントで動作する、シンプルでマネージドなメールサービス

### フォルダによる柔軟なメール管理、メールの自動クリーンアップ

### Discord へのリアルタイム通知

### Cloudflare Access を使用したアクセス認証、チームメンバーへのメールボックス共有

## TODO

- [ ] Create email
- [ ] Search emails
- [ ] Mobile support
- [ ] Multi inbox account

## Tech stacks

- Cloudflare Pages - Deploy the Next.js app
- Cloudflare Workers - Run serverless functions
- Cloudflare Email Routing - Send and receive emails on Workers
- Cloudflare D1 - Serverless SQLite database, stores email data and etc
- Cloudflare R2 - Object storage, stores email attachments
- Cloudflare KV - Stores caches
- Cloudflare Access - Authenticate users with IdP
- Next.js
  - [next-on-pages](https://github.com/cloudflare/next-on-pages)
- Drizzle ORM
- Radix UI / Themes

## Setup

todo

```bash
yarn install
yarn wrangler d1 create cmail # and edit wrangler.toml
yarn wrangler kv:namespace create cmail
yarn wrangler r2 bucket create cmail
yarn wrangler secret put DISCORD_WEBHOOK_URL
yarn deploy
```
