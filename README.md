# create-svelte

## Testing locally with Cloudflare KV support

The `@sveltejs/adapter-cloudflare` adapter only provides `platform.env`, needed for KV access in production builds. So, we can run `build watch` in conjunction with `wrangler pages dev` to test the app with KV support locally. But, this disabled dev time support including HMR.

Run:

```
npx concurrently "wrangler pages dev .svelte-kit/cloudflare --kv AUTH" "npx vite build --watch"
```

Navigate to: http://127.0.0.1:8788/

## Publishing to Cloudflare Pages

```
npm run build && wrangler pages publish .svelte-kit/cloudflare
```

## Find packages that work on Workers

https://workers.cloudflare.com/works

## Logs

```
wrangler pages deployment tail --project-name svelte-auth
```