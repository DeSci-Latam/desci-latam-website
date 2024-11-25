import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";
import icon from "astro-icon";
import simpleStackForm from "simple-stack-form";

const PROD_URL = 'https://testv2descilatam.vercel.app';
const DEV_URL = 'https://localhost:4321';
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: isProduction ? PROD_URL : DEV_URL,
  output: 'static',
  build: {
    format: 'directory'
  },
  experimental: {
    contentCollectionCache: true
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es', 'pt'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  },
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        experimentalThemes: {
          light: 'vitesse-light',
          dark: 'material-theme-palenight'
        },
        wrap: true
      },
      drafts: true,
      gfm: true
    }), 
    icon(), 
    sitemap(), 
    react(), 
    simpleStackForm(), 
    tailwind({
      applyBaseStyles: false
    })
  ],
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: true
    }
  }
});