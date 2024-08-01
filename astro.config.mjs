/* import db from "@astrojs/db"; */
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";
import icon from "astro-icon";
/* import vercel from "@astrojs/vercel/serverless"; */
import simpleStackForm from "simple-stack-form";

// https://astro.build/config
export default defineConfig({
 /*  site: 'https://dev-descilatam.vercel.app', */
 site: 'https://desci.ar',
  
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

  /* mdx({
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-dark-dimmed",
    },
    gfm: true,
  }), */
  icon(),
  sitemap(),
 /*  db(), */
  react(),
  simpleStackForm(),
  tailwind({applyBaseStyles: false,})],
 
  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es', 'pt'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
 /*  output: "hybrid", */  /* adapter: vercel({
    analytics: true,
  }), */
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: 'material-theme-palenight',
			wrap: true
    },
  },
});
