import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";
import icon from "astro-icon";
import simpleStackForm from "simple-stack-form";

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
    drafts: true,
    gfm: true,
  }), 
  icon(),
  sitemap(), 
  react(),
  simpleStackForm(),
  tailwind({applyBaseStyles: false,})],
 
  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es', 'pt'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  output: "hybrid",
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: 'material-theme-palenight',
			wrap: true
    },
  },
});
