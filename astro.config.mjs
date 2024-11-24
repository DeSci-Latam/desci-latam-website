import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";
import icon from "astro-icon";
import simpleStackForm from "simple-stack-form";

const PROD_URL = 'https://dev-descilatam-website.vercel.app';
const DEV_URL = 'https://dev-descilatam-website.vercel.app';
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: isProduction ? PROD_URL : DEV_URL,
  output: 'static',  // Asegura que sea static para Pagefind
  build: {
    format: 'directory'
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