import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kylecesmat.com',
  output: 'static',
  trailingSlash: 'never',
  // One file per page (current.html, not current/index.html): Cloudflare
  // Pages then serves /current itself instead of redirecting to /current/.
  build: {
    format: 'file',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/currently': '/current',
  },
});
