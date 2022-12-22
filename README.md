# sveltekit-auth-template

A SvelteKit / Cloudflare Pages template demonstrating authentication

<img width="1110" alt="2022_12_22T15 41 31Z@2x" src="https://user-images.githubusercontent.com/759811/209170157-1727fb7f-fe86-410c-b470-0054c4e19ba2.png">

## Features

- Authentication: register, login, logout, forgot password flow
- Deployed to Cloudflare Pages
- Uses Cloudflare KV for key/value storage
- Sends email with MailChannels

## Commands:

- `npm run deploy` - Deploy to Cloudflare Pages
- `npm run logs` - Tail Cloudflare Worker logs from latest production deployment
- `wrangler pages project create sveltekit-auth-template` - Create Pages project

## Reference

- Find packages that work on Workers - https://workers.cloudflare.com/works
