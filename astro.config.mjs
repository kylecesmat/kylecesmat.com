import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kylecesmat.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  redirects: {
    '/currently': '/',
  },
});
