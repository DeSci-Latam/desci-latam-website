import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';


// https://astro.build/config
export default defineConfig({
 /*  site: 'https://dev-descilatam.vercel.app', */
 site: 'https://desci-latam-website-git-header-descilatam.vercel.app',
  
  integrations: [mdx({
    syntaxHighlight: 'shiki',
    shikiConfig: {
      experimentalThemes: {
        light: 'vitesse-light',
        dark: 'material-theme-palenight',
        },
      wrap: true
    },
    drafts: true
  }), 
  
  sitemap(), 
  
  tailwind({applyBaseStyles: false,})],
 
  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es', 'pt'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
 
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: 'material-theme-palenight',
			wrap: true
    },
  },
});
