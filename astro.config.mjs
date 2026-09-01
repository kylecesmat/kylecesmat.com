import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kylecesmat.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [mdx(), sitemap()],
  redirects: {
    '/currently': '/now',
  },
});
