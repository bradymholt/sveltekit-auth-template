import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-cloudflare";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },  
  preprocess: vitePreprocess(),
};

export default config;
