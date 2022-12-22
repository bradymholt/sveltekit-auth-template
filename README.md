# sveltekit-auth-template

A SvelteKit / Cloudflare Pages template demonstrating authentication

<img width="1110" alt="2022_12_22T15 41 31Z@2x" src="https://user-images.githubusercontent.com/759811/209170157-1727fb7f-fe86-410c-b470-0054c4e19ba2.png">

## Features

- Authentication: register, login, logout, forgot password flow
- Signed JWT stored as cookie
- Deployed to [Cloudflare Pages](https://pages.cloudflare.com/)
- Uses [Cloudflare KV](https://www.cloudflare.com/products/workers-kv/) for key/value storage
- Sends email with [MailChannels](https://blog.cloudflare.com/sending-email-from-workers-with-mailchannels/)
- Validation using [zod](https://github.com/colinhacks/zod)

## Commands:

- `npm run deploy` - Deploy to Cloudflare Pages
- `npm run logs` - Tail Cloudflare Worker logs from latest production deployment
- `wrangler pages project create sveltekit-auth-template` - Create Pages project

## Reference

- Find packages that work on Workers - https://workers.cloudflare.com/works
