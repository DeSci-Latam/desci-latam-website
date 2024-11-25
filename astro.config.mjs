import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";
import icon from "astro-icon";
import simpleStackForm from "simple-stack-form";

// Configuración de URLs
const SITE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://desci-latam-website-black.vercel.app'
  : 'http://localhost:4321';

export default defineConfig({
  site: SITE_URL,
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