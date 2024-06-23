import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';


// https://astro.build/config
export default defineConfig({
  site: 'https://descilatam.org',
  integrations: [mdx(), sitemap(), tailwind()],
  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es', 'pt'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
    },
  },
});
