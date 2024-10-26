import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/consts';
import { localeParams } from "@/i18n";

export const getStaticPaths = () => localeParams;

export async function GET(context) {
  const locale = context.params.lang;
  
  // Manejar títulos y descripciones
  const localeTitle = typeof SITE_TITLE === "string"
    ? SITE_TITLE
    : SITE_TITLE[locale];
    
  const localeDescription = typeof SITE_DESCRIPTION === "string"
    ? SITE_DESCRIPTION
    : SITE_DESCRIPTION[locale];

  // Obtener posts y validar fechas
  const posts = await getCollection('blog', ({ slug }) => {
    return slug.split("/")[0] === locale;
  });

  // Filtrar posts sin fecha y asegurarse de que las fechas sean válidas
  const validPosts = posts.filter(post => {
    try {
      return post.data.date && new Date(post.data.date).valueOf();
    } catch (e) {
      console.warn(`Post "${post.slug}" has invalid date:`, e);
      return false;
    }
  });

  // Ordenar posts con manejo de errores
  validPosts.sort((a, b) => {
    try {
      const dateA = new Date(a.data.date).valueOf();
      const dateB = new Date(b.data.date).valueOf();
      return dateB - dateA;
    } catch (e) {
      console.warn('Error sorting posts:', e);
      return 0;
    }
  });

  // Crear RSS con validación de campos requeridos
  return rss({
    title: localeTitle || 'Blog',
    description: localeDescription || 'Blog Description',
    site: context.site,
    items: validPosts.map((post) => {
      try {
        return {
          title: post.data.title || 'Untitled',
          pubDate: new Date(post.data.date),
          description: post.data.description || '',
          link: `/${locale}/blog/${post.slug}/`,
        };
      } catch (e) {
        console.warn(`Error processing post "${post.slug}":`, e);
        return null;
      }
    }).filter(Boolean), // Eliminar entradas nulas
  });
}