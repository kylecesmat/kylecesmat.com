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
  // Hashes are per page, so the script and style policy lives in the meta tag
  // Astro writes. public/_headers only adds frame-ancestors, which a meta tag
  // cannot enforce. A script-src in that header would ignore these hashes.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'none'",
        "object-src 'none'",
        'upgrade-insecure-requests',
      ],
      styleDirective: {
        resources: [{ resource: "'unsafe-inline'", kind: 'attribute' }],
      },
    },
  },
});
